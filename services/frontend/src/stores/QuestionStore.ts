import { PublicQuestion } from '@codern/external';
import { atom } from 'jotai';

export const questionsAtom = atom<PublicQuestion[] | null>(null);
