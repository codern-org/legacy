export type GetSubmissionByIdRequest = {
  id: number,
};

export type Submission = {
  id: number,
  questionId: number,
  userId: number,
  language: string,
  filePath: string,
  result: string,
  uploadedAt: number,
};

export type GetSubmissionsByIdResponse = {
  sumissions: Submission[],
};

export type SaveCodeRequest = {
  userId: number,
  questionId: number,
  language: string,
  codePath: string,
};

export enum UploadStatus {
  OK,
  FAILED,
}

export type UploadResponse = {
  code: UploadStatus,
};
