/* eslint-disable max-classes-per-file */

export type ErrorDetail = {
  code: string,
  error: string,
  message: string,
};

export class ExpectedError extends Error {

  public code: string;
  public error: string;
  public message: string;

  public constructor(detail: ErrorDetail) {
    super();
    this.code = detail.code;
    this.error = detail.error;
    this.message = detail.message;
  }

}

export class ExpectedNotFoundError extends ExpectedError {}

export class ExpectedInvalidError extends ExpectedError {}

export class ExpectedDuplicatedError extends ExpectedError {}
