import { atom } from 'jotai';

export type Workspace = {
  title: string,
  creator: string,
  creatorProfile: string,
  participantsProfile: string[],
  progress: number,
  special: boolean,
};

export const workspacesAtom = atom<Workspace[] | null>(null);
