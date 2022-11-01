import { Workspace } from '@/store/WorkspaceStore';

export const mockWorkspaces: Workspace[] = [
  {
    title: 'Bangmod Hackathon',
    creator: 'KMUTT',
    creatorProfile: 'https://bangmodhackathon.com/logo.webp',
    participants: 5,
    progress: 80,
    special: true,
  },
  {
    title: 'Vectier Lab',
    creator: 'Vectier',
    creatorProfile: '/vectier2022-logo-white.png',
    participants: 8,
    progress: 24,
    special: false,
  },
];
