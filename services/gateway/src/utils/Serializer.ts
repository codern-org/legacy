import { PublicQuestion, PublicWorkspaceWithParticipants } from '@codern/external';
import {
  Question, QuestionStatus, QuestionSummary,
  User, WorkspaceWithParticipants,
} from '@codern/internal';

export const getParticipantsFromWorkspaces = (
  workspaces: WorkspaceWithParticipants[],
): string[] => workspaces
  .map((workspace) => workspace.participants.map((participant) => participant.userId))
  .flat();

export const workspaceWithParticipants = async (
  workspaces: WorkspaceWithParticipants[],
  users: User[],
): Promise<PublicWorkspaceWithParticipants[]> => workspaces.map((workspace) => ({
  ...workspace.workspace,
  participants: workspace.participants
    .map((participant) => {
      const profile = users.find((user) => user.id === participant.userId);
      return {
        ...participant,
        profileUrl: profile ? profile.profileUrl : '',
        workspaceId: undefined,
      };
    }),
}));

export const publicQuestions = (
  questions: Question[],
  questionSummaries: QuestionSummary[],
): PublicQuestion[] => questions.map((question) => {
  const summary = questionSummaries.find((data) => data.questionId === question.id);
  return {
    ...question,
    lastSubmitted: summary?.uploadedAt || 0,
    status: summary?.status || QuestionStatus.TODO,
    workspaceId: undefined,
  };
});
