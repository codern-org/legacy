import { Submission } from '@/store/SubmissionStore';

export const mockSubmissions: Submission[] = [
  {
    id: 1,
    date: new Date(),
    language: 'c',
    testcases: [
      { pass: true },
      { pass: true },
      { pass: false, info: 'Time out' },
    ],
  },
  {
    id: 2,
    date: new Date(),
    language: 'cpp',
    testcases: [
      { pass: true },
      { pass: false, info: 'Out of memory' },
    ],
  },
  {
    id: 3,
    date: new Date(),
    language: 'cpp',
    testcases: [
      { pass: true },
      { pass: true },
    ],
  },
  {
    id: 4,
    date: new Date(),
    language: 'c',
    testcases: [
      { pass: true },
      { pass: true },
    ],
  },
  {
    id: 5,
    date: new Date(),
    language: 'c',
    testcases: [
      { pass: true },
      { pass: true },
    ],
  }
]
