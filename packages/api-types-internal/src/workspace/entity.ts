export type Workspace = {
  id: number,
  name: string,
  profilePath: string,
  ownerId: string,
  createdAt: number,
};

export type WorkspaceParticipants = {
  workspaceId: number,
  userId: string,
  joinedAt: number,
};

export type WorkspaceWithParticipants = {
  workspace: Workspace,
  participants: WorkspaceParticipants[],
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
  createdAt: number,
};
