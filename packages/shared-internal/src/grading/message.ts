import { Submission, QuestionSummary, Language } from './entity';

export type GetSubmissionsByQuestionIdRequest = {
  questionId: number,
};

export type GetSubmissionsByQuestionIdResponse = {
  submissions: Submission[],
};

export type SaveCodeRequest = {
  userId: string,
  questionId: number,
  language: Language,
};

export type SubmitRequest = {
  userId: string,
  questionId: number,
  language: Language,
};

export type SubmitResponse = {
  submissionId: number,
  filePath: string,
};

export type GradeRequest = {
  submissionId: number,
};

export type GradeResponse = {
  submissionId: number,
  questionId: number,
  language: Language,
  filePath: string,
};

export type ResultRequest = {
  submissionId: number,
  result: string,
};

export type GetQuestionSummaryByIdRequest = {
  questionIds: number[],
};

export type GetQuestionSummaryByIdResponse = {
  questionSummaries: QuestionSummary[],
};
