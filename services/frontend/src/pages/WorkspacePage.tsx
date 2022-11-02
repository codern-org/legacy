import { Button } from '@/features/common/Button';
import { Navbar } from '@/features/common/navbar/Navbar';
import { Text } from '@/features/common/Text';
import { QuestionTable } from '@/features/workspace/QuestionTable';
import { ChartBarIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

type WorkspacePageProps = {
  path: string,
  workspaceId?: string,
  creatorId?: string,
};

export const WorkspacePage = ({
  path,
  workspaceId,
  creatorId,
}: WorkspacePageProps) => {
  // TODO: breakdown into component
  return (
    <div className="h-screen flex flex-col dark:bg-black transition-theme">
      <Navbar />

      <main className="container w-full h-full flex flex-col p-6">
        <div className="flex flex-row justify-between items-center space-x-2 mb-6 pb-6 border-b border-neutral-300 dark:border-neutral-700 transition-theme">
          <div className="flex flex-row items-center space-x-2">
            <ChevronLeftIcon
              className="w-6 h-6 mr-1 text-black dark:text-white hover:cursor-pointer"
              onClick={() => route('/dashboard')}
            />
            <span
              className="w-10 h-10 flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-theme"
              style={{ backgroundImage: `url(https://bangmodhackathon.com/logo.webp)` }}
            />
            <div>
              <Text color="primary" className="text-lg font-semibold">{workspaceId}</Text>
              <Text color="secondary" className="text-xs">{creatorId}</Text>
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

        <QuestionTable />
      </main>
    </div>
  );
};
