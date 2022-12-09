import { PublicQuestion, PublicQuestionStatus } from '@codern/external';

export const mockQuestions: PublicQuestion[] = [
  {
    id: 1,
    name: 'Porama walker',
    description: 'The hardest path algorithm ever',
    detailPath: '/mockup/question1.md',
    level: 'hard',
    status: PublicQuestionStatus.DONE,
    createdAt: Date.now(),
    lastSubmitted: Date.now(),
  },
  {
    id: 2,
    name: 'Keeratikorn Eating',
    description: 'The easiest noodle algorithm',
    detailPath: '/mockup/question1.md',
    level: 'easy',
    status: PublicQuestionStatus.DONE,
    createdAt: Date.now(),
    lastSubmitted: Date.now(),
  },
  {
    id: 3,
    name: 'Chicken',
    description: 'Need to eat a chicken before code',
    detailPath: '/mockup/question1.md',
    level: 'easy',
    status: PublicQuestionStatus.DONE,
    createdAt: Date.now(),
    lastSubmitted: Date.now(),
  },
  {
    id: 4,
    name: 'Noodle',
    description: 'Need to eat a chicken before code',
    detailPath: '/mockup/question1.md',
    level: 'medium',
    status: PublicQuestionStatus.DONE,
    createdAt: Date.now(),
    lastSubmitted: Date.now(),
  },
];
