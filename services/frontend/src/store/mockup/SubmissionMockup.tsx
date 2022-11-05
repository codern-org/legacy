import { Submission } from '@/store/SubmissionStore';

export const mockSubmissions: Submission[] = [
  {
    id: 1,
    questionId: 2,
    date: new Date(),
    testcase: [true, true, true, true],
  },
  {
    id: 2,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
  {
    id: 3,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
  {
    id: 4,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
  {
    id: 5,
    questionId: 2,
    date: new Date(),
    testcase: [true, true, true, true],
  },
  {
    id: 6,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
  {
    id: 7,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
  {
    id: 8,
    questionId: 2,
    date: new Date(),
    testcase: [true, false, true, false],
  },
]
