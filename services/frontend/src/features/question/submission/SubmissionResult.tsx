import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicSubmissionStatus } from '@codern/external';

const FAIL_INFO: { [key: string]: string } = {
  '2': 'Timeout',
  '3': 'Out of memory',
};

const ERROR_INFO = {
  [PublicSubmissionStatus.FAILED_COMPILATION]: 'Compilation Error',
  [PublicSubmissionStatus.FAILED_MISSING_RESULT]: 'Missing Result',
  [PublicSubmissionStatus.TIMEOUT_EXECUTION]: 'Executation Timeout',
  [PublicSubmissionStatus.TIMEOUT_CONTAINER]: 'Container Timeout',
  [PublicSubmissionStatus.REQUEUE_LIMIT_EXCEEDED]: 'Requeue Limit Exceed',
};

type SubmissionResultProps = {
  status: PublicSubmissionStatus,
  result?: string,
};

export const SubmissionResult = ({
  status,
  result,
}: SubmissionResultProps) => {
  if (status === PublicSubmissionStatus.UPLOADING) {
    return (
      <div className="flex flex-row justify-center items-center space-x-2">
        <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
        <Text color="secondary" className="animate-pulse">Uploading...</Text>
      </div>
    );
  }

  if (status === PublicSubmissionStatus.GRADING) {
    return (
      <div className="flex flex-row justify-center items-center space-x-2 py-2">
        <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
        <Text color="secondary" className="animate-pulse">Grading...</Text>
      </div>
    );
  }

  if (status === PublicSubmissionStatus.COMPLETED) {
    return (
      <>
        {result && [...result].map((result, index) => (
          <span className="flex flex-row space-x-2 font-mono text-xs">
            <Text color="secondary">Case {index + 1}</Text>
            <span className={classNames(
              (result === '0') ? 'text-green-500' : 'text-red-500',
            )}>
              {(result === '0') ? 'Pass' : 'Error'}&nbsp;
              {(Number.parseInt(result) > 1) && (
                <>({FAIL_INFO[result] || 'Error'})</>
              )}
            </span>
          </span>
        ))}
      </>
    );
  }

  return (
    <div className="flex flex-row justify-center items-center space-x-2">
      <span className="py-2 text-red-500 text-sm font-mono">{ERROR_INFO[status]}</span>
    </div>
  );
};
