import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { classNames, numberWithCommas } from '@/utils/Classes';
import { PublicResult, PublicResultStatus } from '@codern/external';
import DOMPurify from 'dompurify';

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
  const hasErrorCompilationLog = results.some((result) => result.status === PublicResultStatus.FAILED_COMPILATION);

  if (isGrading) {
    const completedCount = results.filter((result) => result.status !== PublicResultStatus.GRADING).length;
    return (
      <div className="flex flex-row justify-center items-center space-x-2 py-2">
        <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
        <Text color="secondary" className="animate-pulse">Grading... {completedCount}/{results.length}</Text>
      </div>
    );
  }

  if (hasErrorCompilationLog) {
    const compilationLog = DOMPurify.sanitize(results[0].compilationLog || '');
    const lines = compilationLog.trim().split('\n');

    const errorData = lines[0].split(':');
    const errorName = `<span class="text-yellow-500">${errorData[3]}</span>`;
    lines[0] = `${errorData[0]}:${errorData[1]}:${errorData[2]}:${errorName}:<span class="text-red-500">${errorData.slice(4)}</span>`;

    return (
      <>
        <div className="mb-2 text-xs text-red-500 font-mono">{RESULT_TEXT_MAP[results[0].status]}</div>
        <pre
          dangerouslySetInnerHTML={{
            __html: lines.join('\n'),
          }}
          className="mb-1 p-2 whitespace-pre-wrap text-xs text-neutral-500 dark:text-neutral-400 border border-primary rounded-md"
        />
      </>
    );
  }

  return (
    <>
      {results.map((result, index) => (
        <span className="flex flex-row space-x-2 font-mono text-xs">
          <span className="text-neutral-500 dark:text-neutral-400">Case {index + 1}</span>
          <span className={classNames(
            (result.status === PublicResultStatus.PASSED) ? 'text-green-500' : 'text-red-500',
          )}>
            {RESULT_TEXT_MAP[result.status]}
          </span>

          <span className="text-neutral-500">
            ({numberWithCommas(result.memoryUsage || 0)} MB, {numberWithCommas(result.timeUsage || 0)} ms)
          </span>
        </span>
      ))}
    </>
  );
};
