import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicResult, PublicResultStatus } from '@codern/external';

const RESULT_TEXT_MAP = {
  [PublicResultStatus.GRADING]: 'Grading',
  [PublicResultStatus.PASSED]: 'Passed',
  [PublicResultStatus.FAILED_RESULT]: 'Failed',
  [PublicResultStatus.FAILED_MEMORY_LIMIT]: 'Memory Exceed',
  [PublicResultStatus.FAILED_COMPILATION]: 'Compilation Error',
  [PublicResultStatus.FAILED_CONTAINER]: 'Internal Error',
  [PublicResultStatus.MISSING_RESULT]: 'Missing Result',
  [PublicResultStatus.MISSING_TEST]: 'Missing Testcase',
  [PublicResultStatus.TIMEOUT_EXECUTION]: 'Execution Timeout',
  [PublicResultStatus.TIMEOUT_CONTAINER]: 'Internal Timeout',
  [PublicResultStatus.REQUEUE_LIMIT_EXCEEDED]: 'Internal Error',
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
            (result.status === PublicResultStatus.PASSED) ? 'text-green-500' : 'text-red-500',
          )}>
            {RESULT_TEXT_MAP[result.status]}
          </span>
        </span>
      ))}
    </>
  );
};
