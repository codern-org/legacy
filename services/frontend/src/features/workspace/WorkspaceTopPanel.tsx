import { Button } from '@/features/common/Button';
import { Text } from '@/features/common/Text';
import { ChartBarIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

type WorkspaceTopPanelProps = {
  name: string,
  ownerName: string,
  profilePath: string,
};

export const WorkspaceTopPanel = ({
  name,
  ownerName,
  profilePath,
}: WorkspaceTopPanelProps) => {
  return (
    <div className="flex flex-row justify-between items-center space-x-2 mb-6 pb-6 border-b border-neutral-300 dark:border-neutral-700 transition-theme">
      <div className="flex flex-row items-center space-x-2">
        <ChevronLeftIcon
          className="w-6 h-6 mr-1 text-black dark:text-white hover:text-neutral-400 dark:hover:text-neutral-400 hover:cursor-pointer"
          onClick={() => route('/dashboard')}
        />
        <span
          className="w-10 h-10 flex-none justify-center items-center bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-theme"
          style={{ backgroundImage: `url(${profilePath})` }}
        />
        <div>
          <Text color="primary" className="text-lg font-semibold">{name}</Text>
          <Text color="secondary" className="text-xs">{ownerName}</Text>
        </div>
      </div>

      <Button
        color="secondary"
        size="sm"
      >
        <ChartBarIcon className="w-4 h-4" />
        <span>Ranking</span>
      </Button>
    </div>
  );
};
