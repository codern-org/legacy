import { PublicWorkspaceWithParticipants } from '@codern/external';
import { User, WorkspaceWithParticipants } from '@codern/internal';

export const workspaceWithParticipants = (
  workspaces: WorkspaceWithParticipants[],
  users: User[],
): PublicWorkspaceWithParticipants[] => workspaces.map((workspace) => ({
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
