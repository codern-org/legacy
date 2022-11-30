import { PublicWorkspaceWithParticipants } from '@codern-api/external';
import { atom } from 'jotai';

export const workspacesAtom = atom<PublicWorkspaceWithParticipants[] | null>(null);
