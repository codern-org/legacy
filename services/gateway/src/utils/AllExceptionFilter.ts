import {
  ArgumentsHost, Catch, ExceptionFilter,
  HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import { ErrorDetail, GrpcStatus } from '@codern/internal';
import { FastifyReply, FastifyRequest } from 'fastify';

type GrpcError = {
  code: GrpcStatus,
  error: string,
  details: string,
};

type ValidationError = {
  response: {
    statusCode: number,
    message: string[],
    error: string,
  },
  status: number,
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  private readonly logger: Logger;

  public constructor(logger: Logger) {
    this.logger = logger;
  }

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const initialExceptionMessage = {
      path: request.url,
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    };

    // Catch all error from GRPC client
    if (this.isGrpcError(exception)) {
      try {
        const error: ErrorDetail = JSON.parse(exception.details);
        const statusCode = this.mapStatusCodeGrpcWithHttp(exception.code);

        this.logger.error({
          ...initialExceptionMessage,
          name: error.error,
          message: error.message,
          code: error.code,
        }, {}, 'GrpcException');

        response
          .code(statusCode)
          .send({
            path: request.url,
            error: error.error,
            message: error.message,
            code: error.code,
          });
        return;
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.logger.error({
            ...initialExceptionMessage,
            name: error.name,
            message: error.message,
          }, exception.details, 'GrpcParsingError');
        } else {
          this.logger.error({
            ...initialExceptionMessage,
            name: exception.error,
            message: exception.details,
          }, error, 'UnexpectedError');
        }
        this.responseInternalError(request, response, 'X-000-002');
      }
      return;
    }

    // Catch all validation pipe error
    if (this.isValidationPipeError(exception)) {
      this.logger.error({
        ...initialExceptionMessage,
        name: exception.response.error,
        message: exception.response.message,
      }, {}, 'ValidationException');

      response
        .code(exception.status)
        .send({
          path: request.url,
          error: exception.response.error,
          message: exception.response.message,
          code: 'VP-000-001',
        });
      return;
    }

    // Catch all HTTP exceptions
    if (exception instanceof HttpException) {
      this.logger.error({
        ...initialExceptionMessage,
        name: exception.name,
        message: exception.message,
      }, {}, 'HttpException');

      response
        .code(exception.getStatus())
        .send({
          path: request.url,
          error: exception.name,
          message: exception.message,
          code: 'HE-000-001',
        });
      return;
    }

    // Catch all posible Node.js Error instances
    if (exception instanceof Error) {
      this.logger.error({
        ...initialExceptionMessage,
        name: exception.name,
        message: exception.message,
      }, exception.stack, 'UnexpectedError');
      this.responseInternalError(request, response, 'X-000-001');
      return;
    }

    this.logger.error({
      ...initialExceptionMessage,
      name: exception,
      message: exception,
    }, exception, 'CriticalUnexpectedError');
    this.responseInternalError(request, response, 'X-999-999');
  }

  private responseInternalError(
    request: FastifyRequest,
    response: FastifyReply,
    code: string,
  ): void {
    response
      .code(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({
        path: request.url,
        error: 'Internal server errror',
        message: 'Something went wrong in the internal server',
        code,
      });
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

  private isValidationPipeError(error: unknown): error is ValidationError {
    return (
      (typeof error === 'object')
      && (error !== null)
      && ('response' in error)
      && ('statusCode' in (error as any).response)
      && ('message' in (error as any).response)
      && ('error' in (error as any).response)
      && ('status' in error)
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
