import { Button } from '@/features/common/Button';
import { Navbar } from '@/features/common/navbar/Navbar';
import { Text } from '@/features/common/Text';
import { QuestionsTable } from '@/features/workspace/QuestionsTable';
import { ChartBarIcon } from '@heroicons/react/24/outline';

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
    <main className="min-h-screen dark:bg-black transition-colors ease-in duration-200">
      <Navbar />

      <section className="container w-full h-full flex flex-col p-6">
        <div className="flex flex-row justify-between items-center space-x-2 mb-6 pb-6 border-b border-neutral-300 dark:border-neutral-700 transition-colors ease-in duration-200">
          <div className="flex flex-row items-center space-x-2">
            <span className={`w-10 h-10 flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-colors ease-in duration-200`} style={{ backgroundImage: `url(https://bangmodhackathon.com/logo.webp)` }} />
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

        <QuestionsTable />
      </section>
    </main>
  );
};
