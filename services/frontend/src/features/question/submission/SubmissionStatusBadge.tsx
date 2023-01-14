import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicResult, PublicResultStatus } from '@codern/external';

type SubmissionStatusBadgeProps = {
  results: PublicResult[],
};

export const SubmissionStatusBadge = ({
  results,
}: SubmissionStatusBadgeProps) => {
  const isGrading = results.some((result) => result.status === PublicResultStatus.GRADING);
  const isError = results.some((result) => result.status !== PublicResultStatus.PASS);
  const isCompleteWithoutError = (!isGrading && !isError);

  return (
    <div className="w-fit flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
      <span className={classNames(
        'w-2 h-2 rounded-full',
        isGrading && 'bg-yellow-500',
        isError && 'bg-red-500',
        isCompleteWithoutError && 'bg-green-500',
      )} />
      <Text color="secondary" className="text-sm md:text-base capitalize">
        {isCompleteWithoutError ? 'Done' : (isGrading ? 'Grading' : 'Error')}
      </Text>
    </div>
  );
};
