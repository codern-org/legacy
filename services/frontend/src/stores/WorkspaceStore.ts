import { PublicWorkspace, PublicWorkspaceWithParticipants } from '@codern/external';
import { atom } from 'jotai';

export const workspacesAtom = atom<PublicWorkspaceWithParticipants[] | null>(null);

export const workspaceAtom = atom<PublicWorkspace | null>(null);
