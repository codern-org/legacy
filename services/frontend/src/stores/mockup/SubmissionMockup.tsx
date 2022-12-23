import { PublicLanguage, PublicSubmission, PublicSubmissionStatus } from '@codern/external';
import { Timestamp } from '@codern/shared';

export const mockSubmissions: PublicSubmission[] = [
  {
    id: 1,
    language: PublicLanguage.C,
    filePath: '',
    status: PublicSubmissionStatus.COMPLETED,
    result: '000112',
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    status: PublicSubmissionStatus.TIMEOUT_EXECUTION,
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    status: PublicSubmissionStatus.COMPLETED,
    result: '000000',
    uploadedAt: Timestamp.now(),
  },
]
