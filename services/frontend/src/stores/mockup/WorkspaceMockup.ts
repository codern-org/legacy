import { Workspace } from '@/stores/WorkspaceStore';

const randomHexColor = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const randomProfile = () => {
  return `https://source.boringavatars.com/beam?colors=${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()}`
};

export const mockWorkspaces: Workspace[] = [
  {
    title: 'Bangmod Hackathon',
    creator: 'KMUTT',
    creatorProfile: 'https://bangmodhackathon.com/logo.webp',
    participantsProfile: [
      randomProfile(),
      randomProfile(),
      randomProfile(),
      randomProfile(),
    ],
    progress: 80,
    special: true,
  },
  {
    title: 'Vectier Lab',
    creator: 'Vectier',
    creatorProfile: '/vectier2022-logo-white.png',
    participantsProfile: [
      randomProfile(),
      randomProfile(),
      randomProfile(),
      randomProfile(),
      randomProfile(),
      randomProfile(),
      randomProfile(),
    ],
    progress: 24,
    special: false,
  },
];
