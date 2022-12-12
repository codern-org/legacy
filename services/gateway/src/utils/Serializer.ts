import { PublicQuestion, PublicWorkspaceWithParticipants } from '@codern/external';
import {
  GetSubmissionsByQuestionIdResponse,
  Owner,
  Question, QuestionStatus, QuestionSummary,
  User, WorkspaceWithParticipants,
} from '@codern/internal';
import { map } from 'rxjs';

export const getParticipantsFromWorkspaces = (
  workspaces: WorkspaceWithParticipants[],
): string[] => workspaces
  .map((workspace) => workspace.participants.map((participant) => participant.userId))
  .flat();

export const getOwnerIdsFromWorkspaces = (
  workspaces: WorkspaceWithParticipants[],
): string[] => [...new Set(workspaces.map(({ workspace }) => workspace.ownerId))];

export const workspaceWithParticipants = async (
  workspaces: WorkspaceWithParticipants[],
  users: User[],
  owners: Owner[],
): Promise<PublicWorkspaceWithParticipants[]> => workspaces.map((workspace) => {
  const ownerData = owners.find((owner) => owner.id === workspace.workspace.ownerId);
  return {
    ...workspace.workspace,
    ownerName: ownerData ? ownerData.displayName : '',
    participants: workspace.participants
      .map((participant) => {
        const userData = users.find((user) => user.id === participant.userId);
        return {
          ...participant,
          profileUrl: userData ? userData.profileUrl : '',
          workspaceId: undefined,
        };
      }),
  };
});

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

export const publishSubmissions = map(
  (response: GetSubmissionsByQuestionIdResponse) => response
    .submissions.map((submission) => ({
      ...submission,
      questionId: undefined,
      userId: undefined,
    })),
);
