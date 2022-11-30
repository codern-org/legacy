import { Language, Submission } from './entity';

export type GetSubmissionsRequest = {
  id: number,
};

export type GetSubmissionsResponse = {
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
