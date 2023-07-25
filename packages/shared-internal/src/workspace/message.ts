import {
  WorkspaceWithParticipants, Workspace, Question,
} from './entity';

export type ValidateUserInWorkspaceRequest = {
  userId: string,
  workspaceId: number,
};

export type ValidateQuestionInWorkspaceRequest = {
  questionId: number,
  workspaceId: number,
};

export type GetAllWorkspacesByUserIdRequest = {
  userId: string,
};

export type GetAllWorkspacesByUserIdResponse = {
  workspaces: WorkspaceWithParticipants[],
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

export type GetQuestionsByWorkspaceIdResponse = {
  questions: Question[],
};

export type GetQuestionByIdRequest = {
  id: number,
};

export type GetQuestionByIdResponse = {
  question: Question,
};

export type CreateWorkspaceQuestionRequest = {
  question: Omit<Question, 'id' | 'detailPath' | 'createdAt'>,
};

export type CreateWorkspaceQuestionResponse = {
  question: Question,
};
