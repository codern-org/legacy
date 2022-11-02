import { Button } from '@/features/common/Button';
import { Markdown } from '@/features/common/Makdown';
import { Text } from '@/features/common/Text';
import { Question } from '@/store/QuestionStore';
import { classNames } from '@/utils/Classes';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

type QuestionPaneProps = {
  question: Question
  creatorId: string,
  workspaceId: string,
};

export const QuestionPane = ({
  creatorId,
  workspaceId,
  question,
}: QuestionPaneProps) => {
  return (
    <div className="h-full flex flex-col p-6 border border-primary rounded-lg">
      <div className="flex flex-row justify-between items-center mb-4 pb-4 border-b border-primary">
        <div className="flex flex-row items-center">
          <ChevronLeftIcon
            className="w-4 h-4 mr-1 text-black dark:text-white hover:cursor-pointer"
            onClick={() => route(`/workspace/${creatorId}/${workspaceId}`)}
          />
          <Text color="primary" className="mr-2">{question.title}</Text>
          <Text color="secondary" className="capitalize">({question.level})</Text>
        </div>

        <div className="flex flex-row items-center space-x-2 px-2 border border-primary rounded-lg">
          <div className={classNames(
            'w-2 h-2 rounded-full capitalize',
            (question.status === 'todo') && 'bg-neutral-500',
            (question.status === 'wait') && 'bg-yellow-500',
            (question.status === 'error') && 'bg-red-500',
            (question.status === 'done') && 'bg-green-500',
          )} />
          <Text color="secondary" className="text-sm md:text-base capitalize">
            {question.status}
          </Text>
        </div>
      </div>

      <div className="flex flex-row mb-8 space-x-2 pb-4 border-b border-primary">
        <Button color="secondary" size="sm" active>Problem</Button>
        <Button color="secondary" size="sm">Submissions</Button>
      </div>

      <div className="py-4 overflow-y-auto">
        <Markdown markdown={question.detail} />
      </div>
    </div >
  );
};
