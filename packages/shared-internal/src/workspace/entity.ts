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
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  REVERSE = 'REVERSE',
}

export type Question = {
  id: number,
  name: string,
  description: string,
  detailPath: string,
  memoryLimit: number,
  timeLimit: number,
  level: QuestionLevel,
  workspaceId: number,
  createdAt: number,
};
