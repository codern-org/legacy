import {
  Language, QuestionLevel,
  QuestionStatus, QuestionSummary, SubmissionWithResults,
  ResultStatus,
  Result,
  Rank,
} from '@codern/internal';

export { Language as PublicLanguage };

export type PublicSubmission = Omit<SubmissionWithResults, 'questionId' | 'userId' | 'results'> & {
  results: PublicResult[]
};

export type PublicResult = Omit<Result, 'submissionId' | 'testcaseId'>;

export type PublicQuestionSummary = QuestionSummary;

// TODO: hardcoded for BMH2023
export type PublicRank = Rank;

export { QuestionStatus as PublicQuestionStatus };

export { QuestionLevel as PublicQuestionLevel };

export { ResultStatus as PublicResultStatus };
