export enum Language {
  C = 'C',
  CPP = 'CPP',
}

export type Submission = {
  id: number,
  questionId: number,
  userId: number,
  language: Language,
  filePath: string,
  result: string,
  uploadedAt: number,
};

export enum QuestionStatus {
  TODO = 'TODO',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export enum SubmissionStatus {
  ERROR = 'ERROR',
  PASS = 'PASS',
}

export enum TestcaseStatus {
  PASS = '0',
  ERROR_TIMEOUT = '1',
  ERROR_OUR_OF_MEMORY = '2',
}

export type QuestionSummary = {
  questionId: number,
  uploadedAt: number,
  status: QuestionStatus,
};
