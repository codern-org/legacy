import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import {
  ExpectedDuplicatedError, ExpectedError, GrpcStatus,
  ExpectedInvalidError, ExpectedNotFoundError, ExpectedForbiddenError,
} from '@codern-api/internal';
import { Observable, throwError } from 'rxjs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  private readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public catch(exception: unknown): Observable<never> {
    // Mapping business error with RPC excpetion for nestjs serialization
    if (exception instanceof ExpectedError) {
      let code = GrpcStatus.INTERNAL;
      const message = JSON.stringify(exception);

      if (exception instanceof ExpectedNotFoundError) code = GrpcStatus.NOT_FOUND;
      if (exception instanceof ExpectedInvalidError) code = GrpcStatus.INVALID_ARGUMENT;
      if (exception instanceof ExpectedDuplicatedError) code = GrpcStatus.ALREADY_EXISTS;
      if (exception instanceof ExpectedForbiddenError) code = GrpcStatus.PERMISSION_DENIED;

      return throwError(() => new RpcException({ code, message }).getError());
    }

    // Mapping all posible Prisma Exceptions
    // ref: https://www.prisma.io/docs/reference/api-reference/error-reference
    if (this.isPrismaError(exception)) {
      this.logger.error(exception.message, exception.stack, 'PrismaException');
      return this.throwUnexpectedError('Unexpected error caused by database');
    }

    // Mapping all posible Node.js Error instances
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack, 'UnexpectedError');
      return this.throwUnexpectedError('Unexpected error');
    }

    this.logger.error('Unexpected error', exception, 'UnexpectedException');
    return this.throwUnexpectedError('Critical unexpected error');
  }

  private throwUnexpectedError(message: string): Observable<never> {
    return throwError(() => new RpcException({
      code: GrpcStatus.INTERNAL,
      message,
    }).getError());
  }

  private isPrismaError(error: unknown): error is Error {
    const possiblePrimaErrors = [
      Prisma.PrismaClientRustPanicError,
      Prisma.PrismaClientValidationError,
      Prisma.PrismaClientKnownRequestError,
      Prisma.PrismaClientInitializationError,
      Prisma.PrismaClientUnknownRequestError,
    ];
    return possiblePrimaErrors.some((prismaError) => error instanceof prismaError);
  }

}
