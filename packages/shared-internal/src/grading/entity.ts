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
  status: SubmissionStatus,
  result: string | null,
  uploadedAt: number,
};

export enum QuestionStatus {
  TODO = 'TODO',
  DONE = 'DONE',
  ERROR = 'ERROR',
}
export enum TestcaseStatus {
  PASS = '0',
  ERROR_TIMEOUT = '1',
  ERROR_OUR_OF_MEMORY = '2',
}

export enum SubmissionStatus {
  UPLOADING = 'UPLOADING',
  GRADING = 'GRADING',
  COMPLETED = 'COMPLETED',
  FAILED_COMPILATION = 'FAILED_COMPILATION',
  FAILED_MISSING_RESULT = 'FAILED_MISSING_RESULT',
  TIMEOUT_EXECUTION = 'TIMEOUT_EXECUTION',
  TIMEOUT_CONTAINER = 'TIMEOUT_CONTAINER',
  REQUEUE_LIMIT_EXCEEDED = 'REQUEUE_LIMIT_EXCEEDED',
}

export type QuestionSummary = {
  questionId: number,
  uploadedAt: number,
  status: QuestionStatus,
};
