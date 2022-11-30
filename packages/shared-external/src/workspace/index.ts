import { Question, Workspace, WorkspaceParticipants } from '@codern/internal';

export type PublicWorkspace = Workspace;

export type PublicWorkspaceWithParticipants = Workspace & {
  participants: Omit<WorkspaceParticipants & { profileUrl: string }, 'workspaceId'>[],
};

export type PublicQuestion = Question;
