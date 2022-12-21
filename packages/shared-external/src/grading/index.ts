import {
  GradeResponse, Language, QuestionLevel,
  QuestionStatus, QuestionSummary, Submission,
  SubmissionStatus,
} from '@codern/internal';

export { Language as PublicLanguage };

export type PublicSubmission = Omit<Submission, 'questionId' | 'userId' | 'result'> & {
  result?: string,
};

export type PublicGradeResponse = GradeResponse;

export type PublicQuestionSummary = QuestionSummary;

export { SubmissionStatus as PublicSubmissionStatus };

export { QuestionStatus as PublicQuestionStatus };

export { QuestionLevel as PublicQuestionLevel };
