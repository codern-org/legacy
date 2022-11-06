import { Text } from '@/features/common/Text';
import { Question } from '@/store/QuestionStore';
import { classNames } from '@/utils/Classes';

const getColorByStatus = (status: Question['status']) => ({
  todo: 'bg-neutral-500',
  wait: 'bg-yellow-500',
  error: 'bg-red-500',
  done: 'bg-green-500',
}[status]);

type QuestionStatusBadgeProps = {
  status: Question['status'],
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
        {status}
      </Text>
    </div>
  );
};
