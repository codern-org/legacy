import { atom } from 'jotai';

export type Workspace = {
  title: string,
  creator: string,
  creatorProfile: string,
  participants: number,
  progress: number,
  special: boolean,
};

const workspacesDataAtom = atom<Workspace[] | null>(null);

export const workspacesAtom = atom<Workspace[] | null, Workspace[]>(
  (get) => get(workspacesDataAtom),
  (get, set, update) => set(workspacesDataAtom, update),
);
