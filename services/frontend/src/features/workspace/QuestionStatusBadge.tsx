import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { PublicQuestion } from '@codern/external';

const getColorByStatus = (status: PublicQuestion['status']) => ({
  TODO: 'bg-neutral-500',
  ERROR: 'bg-red-500',
  DONE: 'bg-green-500',
}[status]);

type QuestionStatusBadgeProps = {
  status: PublicQuestion['status'],
};

export const QuestionStatusBadge = ({
  status,
}: QuestionStatusBadgeProps) => {
  return (
    <div className="w-fit flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
      <span className={classNames(
        'w-2 h-2 rounded-full capitalize',
        getColorByStatus(status),
      )} />
      <Text color="secondary" className="text-sm md:text-base capitalize">
        {status.toLowerCase()}
      </Text>
    </div>
  );
};
