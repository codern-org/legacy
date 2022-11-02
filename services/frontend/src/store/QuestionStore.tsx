import { atom } from 'jotai';

export type Question = {
  id: number,
  name: string,
  description: string,
  detail: string,
  level: 'easy' | 'medium' | 'hard',
  status: 'todo' | 'wait' | 'error' | 'done',
  lastSubmitted: Date,
};

export const questionsAtom = atom<Question[] | null>(null);
