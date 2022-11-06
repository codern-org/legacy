import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';

type SubmissionStatusBadgeProps = {
  pass: boolean,
};

export const SubmissionStatusBadge = ({
  pass,
}: SubmissionStatusBadgeProps) => {
  return (
    <div className="w-fit flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
      <span className={classNames(
        'w-2 h-2 rounded-full capitalize',
        pass ? 'bg-green-500' : 'bg-red-500',
      )} />
      <Text color="secondary" className="text-sm md:text-base capitalize">
        {pass ? 'Pass' : 'Error'}
      </Text>
    </div>
  );
};
