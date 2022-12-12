import { PublicQuestion } from '@codern/external';
import { atom } from 'jotai';

export const questionsAtom = atom<PublicQuestion[] | null>(null);

export const questionAtom = atom<PublicQuestion | null>(null);
