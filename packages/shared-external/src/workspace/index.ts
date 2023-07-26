import {
  Question, QuestionStatus, Workspace,
  WorkspaceParticipants,
} from '@codern/internal';

export type PublicWorkspace = Workspace & { ownerName: string };

export type PublicWorkspaceWithParticipants = PublicWorkspace & {
  participants: Omit<WorkspaceParticipants & { profilePath: string }, 'workspaceId'>[],
};

export type PublicQuestion = Omit<Question, 'workspaceId'> & {
  lastSubmitted: number,
  status: QuestionStatus,
};

export type PublicCreatedQuestion = Question & { score: number };
