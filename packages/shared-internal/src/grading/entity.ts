export enum Language {
  C = 'C',
  CPP = 'CPP',
}

export type Submission = {
  id: number,
  questionId: number,
  userId: string,
  language: Language,
  filePath: string,
  uploadedAt: number,
};

export type SubmissionWithResults = Submission & { results: Result[] };

export type QuestionSummary = {
  questionId: number,
  uploadedAt: number,
  status: QuestionStatus,
};

export enum QuestionStatus {
  TODO = 'TODO',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export type Result = {
  id: number,
  submissionId: number,
  testcaseId: number,
  status: ResultStatus,
};

export enum ResultStatus {
  GRADING = 'GRADING',
  PASSED = 'PASSED',
  FAILED_COMPILATION = 'FAILED_COMPILATION',
  FAILED_MISSING_RESULT = 'FAILED_MISSING_RESULT',
  TIMEOUT_EXECUTION = 'TIMEOUT_EXECUTION',
  TIMEOUT_CONTAINER = 'TIMEOUT_CONTAINER',
  REQUEUE_LIMIT_EXCEEDED = 'REQUEUE_LIMIT_EXCEEDED',
}
