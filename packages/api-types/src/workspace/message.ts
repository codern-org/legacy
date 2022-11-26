export type IsInWorkspaceRequest = {
  userId: string,
  workspaceId: number,
};

export type IsInWorkspaceResponse = {
  isInWorkspace: boolean,
};

export type GetAllWorkspacesRequest = {
  userId: string,
};

export type Workspace = {
  id: number,
  name: string,
  profilePath: string,
  ownerId: string,
  createdAt: bigint,
};

export type GetAllWorkspacesResponse = {
  workspaces: Workspace[],
};

export type GetWorkspaceByIdRequest = {
  workspaceId: number;
};

export type GetWorkspaceByIdResponse = {
  workspace: Workspace,
};

export type GetQuestionsByWorkspaceIdRequest = {
  id: number,
};

export enum QuestionLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export type Question = {
  id: number,
  name: string,
  description: string,
  detailPath: string,
  level: string,
  workspaceId: number,
  createdAt: bigint,
};

export type GetQuestionsByWorkspaceIdResponse = {
  questions: Question[],
};

export type GetQuestionByIdRequest = {
  id: number,
};

export type GetQuestionByIdResponse = {
  question: Question,
};
