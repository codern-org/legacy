import {
  Question, QuestionStatus, Workspace,
  WorkspaceParticipants,
} from '@codern/internal';

export type PublicWorkspace = Workspace;

export type PublicWorkspaceWithParticipants = Workspace & {
  participants: Omit<WorkspaceParticipants & { profileUrl: string }, 'workspaceId'>[],
};

export type PublicQuestion = Omit<Question, 'workspaceId'> & {
  lastSubmitted: number,
  status: QuestionStatus,
};
