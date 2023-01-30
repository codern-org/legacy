import { QuestionPaneSection } from '@/features/board/question/QuestionPane';
import { PublicSubmission } from '@codern/external';
import { atom } from 'jotai';

export const questionPaneAtom = atom<QuestionPaneSection>('problem');

export const submissionsAtom = atom<PublicSubmission[] | null>(null);

export const lastSubmissionIdAtom = atom<number | null>(null);
