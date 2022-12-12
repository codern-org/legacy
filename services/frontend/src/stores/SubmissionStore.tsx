import { PublicSubmission } from '@codern/external';
import { atom } from 'jotai';

export const submissionsAtom = atom<PublicSubmission[] | null>(null);
