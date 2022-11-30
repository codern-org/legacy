import {
  ArgumentsHost, Catch, ExceptionFilter,
  HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import { ErrorDetail, GrpcStatus } from '@codern/internal';
import { FastifyReply } from 'fastify';

type GrpcError = {
  code: GrpcStatus,
  error: string,
  details: string,
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  private readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    // Catch all error from GRPC client
    if (this.isGrpcError(exception)) {
      try {
        const error = JSON.parse(exception.details);
        response
          .code(this.mapStatusCodeGrpcWithHttp(exception.code))
          .send(error);
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.logger.error(exception.details, error, 'GrpcParsingError');
        } else {
          this.logger.error(error, error, 'UnexpectedError');
        }
        this.responseInternalError(response, 'X-000-002');
      }
      return;
    }

    // Catch all HTTP exceptions
    if (exception instanceof HttpException) {
      throw exception;
    }

    // Catch all posible Node.js Error instances
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack, 'UnexpectedError');
      this.responseInternalError(response, 'X-000-001');
      return;
    }

    this.logger.error(exception, exception, 'CriticalUnexpectedError');
    this.responseInternalError(response, 'X-999-999');
  }

  private internalServerError(code: string): ErrorDetail {
    return {
      code,
      error: 'Internal server errror',
      message: 'Something went wrong in the internal server',
    };
  }

  private responseInternalError(response: FastifyReply, code: string): void {
    response
      .code(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(this.internalServerError(code));
  }

  private isGrpcError(error: unknown): error is GrpcError {
    return (
      (typeof error === 'object')
      && (error !== null)
      && ('code' in error)
      && ('details' in error)
      && ('message' in error)
    );
  }

  private mapStatusCodeGrpcWithHttp(code: GrpcStatus): number {
    return {
      [GrpcStatus.OK]: HttpStatus.OK,
      [GrpcStatus.CANCELLED]: HttpStatus.METHOD_NOT_ALLOWED,
      [GrpcStatus.UNKNOWN]: HttpStatus.BAD_GATEWAY,
      [GrpcStatus.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
      [GrpcStatus.DEADLINE_EXCEEDED]: HttpStatus.REQUEST_TIMEOUT,
      [GrpcStatus.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [GrpcStatus.ALREADY_EXISTS]: HttpStatus.CONFLICT,
      [GrpcStatus.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
      [GrpcStatus.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
      [GrpcStatus.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_REQUIRED,
      [GrpcStatus.ABORTED]: HttpStatus.METHOD_NOT_ALLOWED,
      [GrpcStatus.OUT_OF_RANGE]: HttpStatus.PAYLOAD_TOO_LARGE,
      [GrpcStatus.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
      [GrpcStatus.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
      [GrpcStatus.UNAVAILABLE]: HttpStatus.NOT_FOUND,
      [GrpcStatus.DATA_LOSS]: HttpStatus.INTERNAL_SERVER_ERROR,
      [GrpcStatus.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
    }[code];
  }

}
