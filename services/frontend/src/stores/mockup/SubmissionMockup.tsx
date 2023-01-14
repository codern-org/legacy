import { PublicLanguage, PublicSubmission, PublicResultStatus } from '@codern/external';
import { Timestamp } from '@codern/shared';

export const mockSubmissions: PublicSubmission[] = [
  {
    id: 1,
    language: PublicLanguage.C,
    filePath: '',
    results: [
      { id: 1, status: PublicResultStatus.PASS },
      { id: 2, status: PublicResultStatus.PASS },
    ],
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    results: [
      { id: 1, status: PublicResultStatus.GRADING },
      { id: 2, status: PublicResultStatus.PASS },
    ],
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    results: [
      { id: 1, status: PublicResultStatus.FAILED_COMPILATION },
      { id: 2, status: PublicResultStatus.PASS },
    ],
    uploadedAt: Timestamp.now(),
  },
]
