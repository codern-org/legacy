import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicResult, PublicResultStatus } from '@codern/external';

const RESULT_TEXT_MAP = {
  [PublicResultStatus.GRADING]: 'Grading',
  [PublicResultStatus.PASS]: 'PASS',
  [PublicResultStatus.FAILED_COMPILATION]: 'Compilation Error',
  [PublicResultStatus.FAILED_MISSING_RESULT]: 'Missing Result',
  [PublicResultStatus.TIMEOUT_EXECUTION]: 'Execution Timeout',
  [PublicResultStatus.TIMEOUT_CONTAINER]: 'Container Timeout',
  [PublicResultStatus.REQUEUE_LIMIT_EXCEEDED]: 'Requeue Limit Exceed',
};

type SubmissionResultProps = {
  results: PublicResult[],
};

export const SubmissionResult = ({
  results,
}: SubmissionResultProps) => {
  const isGrading = results.some((result) => result.status === PublicResultStatus.GRADING);

  if (isGrading) {
    return (
      <div className="flex flex-row justify-center items-center space-x-2 py-2">
        <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
        <Text color="secondary" className="animate-pulse">Grading...</Text>
      </div>
    );
  }

  return (
    <>
      {results.map((result, index) => (
        <span className="flex flex-row space-x-2 font-mono text-xs">
          <Text color="secondary">Case {index + 1}</Text>
          <span className={classNames(
            (result.status === PublicResultStatus.PASS) ? 'text-green-500' : 'text-red-500',
          )}>
            {(result.status === PublicResultStatus.PASS) ? 'Pass' : 'Error'}&nbsp;
            {(result.status !== PublicResultStatus.PASS) && <>({RESULT_TEXT_MAP[result.status]})</>}
          </span>
        </span>
      ))}
    </>
  );
};
