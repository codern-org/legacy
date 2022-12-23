import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicSubmissionStatus } from '@codern/external';

const COLOR_AND_TEXT_MAP = {
  [PublicSubmissionStatus.UPLOADING]: { color: 'bg-yellow-500', text: 'Uploading' },
  [PublicSubmissionStatus.GRADING]: { color: 'bg-yellow-500', text: 'Grading' },
  [PublicSubmissionStatus.COMPLETED]: { color: 'bg-green-500', text: 'Pass' },
  [PublicSubmissionStatus.FAILED_COMPILATION]: { color: 'bg-red-500', text: 'Error' },
  [PublicSubmissionStatus.FAILED_MISSING_RESULT]: { color: 'bg-red-500', text: 'Error' },
  [PublicSubmissionStatus.TIMEOUT_EXECUTION]: { color: 'bg-red-500', text: 'Error' },
  [PublicSubmissionStatus.TIMEOUT_CONTAINER]: { color: 'bg-red-500', text: 'Error' },
  [PublicSubmissionStatus.REQUEUE_LIMIT_EXCEEDED]: { color: 'bg-red-500', text: 'Error' },
};

type SubmissionStatusBadgeProps = {
  status: PublicSubmissionStatus,
  result?: string,
};

export const SubmissionStatusBadge = ({
  status,
  result,
}: SubmissionStatusBadgeProps) => {
  const isCompleteWithError = (
    (status === PublicSubmissionStatus.COMPLETED) && (Number.parseInt(result || '1') !== 0)
  );

  return (
    <div className="w-fit flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
      <span className={classNames(
        'w-2 h-2 rounded-full capitalize',
        isCompleteWithError
          ? 'bg-red-500'
          : COLOR_AND_TEXT_MAP[status].color,
      )} />
      <Text color="secondary" className="text-sm md:text-base capitalize">
        {isCompleteWithError ? 'Error' : COLOR_AND_TEXT_MAP[status].text}
      </Text>
    </div>
  );
};
