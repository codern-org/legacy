import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicSubmissionStatus } from '@codern/external';

const COLOR_MAP = {
  [PublicSubmissionStatus.GRADING]: 'bg-yellow-500',
  [PublicSubmissionStatus.ERROR]: 'bg-red-500',
  [PublicSubmissionStatus.PASS]: 'bg-green-500',
};

const TEXT_MAP = {
  [PublicSubmissionStatus.GRADING]: 'Grading',
  [PublicSubmissionStatus.ERROR]: 'Error',
  [PublicSubmissionStatus.PASS]: 'Pass',
};

type SubmissionStatusBadgeProps = {
  status: PublicSubmissionStatus,
};

export const SubmissionStatusBadge = ({
  status,
}: SubmissionStatusBadgeProps) => {
  return (
    <div className="w-fit flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
      <span className={classNames(
        'w-2 h-2 rounded-full capitalize',
        COLOR_MAP[status],
      )} />
      <Text color="secondary" className="text-sm md:text-base capitalize">
        {TEXT_MAP[status]}
      </Text>
    </div>
  );
};
