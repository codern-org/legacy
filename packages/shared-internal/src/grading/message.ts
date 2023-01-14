import {
  QuestionSummary, Language, ResultStatus,
  SubmissionWithResults,
} from './entity';

export type GetSubmissionsByQuestionIdRequest = {
  userId?: string,
  questionId: number,
};

export type GetSubmissionsByQuestionIdResponse = {
  submissions: SubmissionWithResults[],
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

export type GradeResponse = SubmissionWithResults;

export type ResultRequest = {
  id: number,
  status: ResultStatus,
};

export type GetQuestionSummaryByIdsRequest = {
  userId?: string,
  questionIds: number[],
};

export type GetQuestionSummaryByIdsResponse = {
  questionSummaries: QuestionSummary[],
};
