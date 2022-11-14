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

export class NotFoundExpectedError extends ExpectedError {}

export class InvalidExpectedError extends ExpectedError {}

export class DuplicatedExpectedError extends ExpectedError {}
