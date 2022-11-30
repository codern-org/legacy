import { PublicWorkspaceWithParticipants } from '@codern/external';
import { atom } from 'jotai';

export const workspacesAtom = atom<PublicWorkspaceWithParticipants[] | null>(null);
