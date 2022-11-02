import { Markdown } from '@/features/common/Makdown';
import { Text } from '@/features/common/Text';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

type QuestionPaneProps = {
  creatorId: string,
  workspaceId: string,
  name: string,
  detail: string,
};

export const QuestionPane = ({
  creatorId,
  workspaceId,
  name,
  detail
}: QuestionPaneProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mb-6">
        <ChevronLeftIcon
          className="w-4 h-4 mr-1 text-black dark:text-white hover:cursor-pointer"
          onClick={() => route(`/workspace/${creatorId}/${workspaceId}`)}
        />

        <Text color="primary">{name}</Text>
      </div>

      <Markdown markdown={detail} />
    </div>
  );
};
