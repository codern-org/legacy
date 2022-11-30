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
