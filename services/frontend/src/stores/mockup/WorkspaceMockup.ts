import { PublicWorkspaceWithParticipants } from '@codern/external';
import { Timestamp } from '@codern/shared';

const randomHexColor = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

const randomProfile = () => {
  return `https://source.boringavatars.com/beam?colors=${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()}`
};

export const mockWorkspaces: PublicWorkspaceWithParticipants[] = [
  {
    id: 1,
    name: 'Vectier Lab',
    ownerId: '1',
    createdAt: Timestamp.now(),
    profilePath: '/vectier2022-logo-white.png',
    participants: [
      {
        userId: '1',
        profileUrl: randomProfile(),
        joinedAt: Timestamp.now(),
      },
      {
        userId: '2',
        profileUrl: randomProfile(),
        joinedAt: Timestamp.now(),
      }
    ],
    // progress: 24,
    // special: false,
  },
];
