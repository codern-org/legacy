import { PublicLanguage, PublicSubmission } from '@codern/external';
import { Timestamp } from '@codern/shared';

export const mockSubmissions: PublicSubmission[] = [
  {
    id: 1,
    language: PublicLanguage.C,
    filePath: '',
    result: '000112',
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    result: '100112',
    uploadedAt: Timestamp.now(),
  },
  {
    id: 2,
    language: PublicLanguage.C,
    filePath: '',
    uploadedAt: Timestamp.now(),
  },
]
