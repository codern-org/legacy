import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Row } from '@/features/common/layout/Row';
import { Text } from '@/features/common/Text';
import { WorkspaceTable } from '@/features/dashboard/content/workspace/WorkspaceTable';
import { PlusSmallIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const DashboardContent = () => {
  return (
    <div className="h-screen flex flex-col p-6 dark:bg-zinc-900">
      <header className="flex mb-6">
        <Text color="primary" className="text-2xl font-semibold mr-auto">
          Dashboard
        </Text>

        <Button color="primary" size="sm">
          <PlusSmallIcon className="w-6 h-6 -mx-2" />
          <span>Add Workspace</span>
        </Button>
      </header>

      <div className="flex flex-row space-x-6">
        <div className="w-fit p-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-600 rounded-lg space-y-2 mb-6">
          <p className="text-black dark:text-white font-semibold">Total Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">1</p>
        </div>
        <div className="w-fit p-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-600 rounded-lg space-y-2 mb-6">
          <p className="text-black dark:text-white font-semibold">Complete Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">0</p>
        </div>
      </div>

      <Row className="justify-between mb-6">
        <div>
          {/* TODO: add filter */}
        </div>
        <Input
          type="text"
          icon={<MagnifyingGlassIcon />}
          placeholder="Search workspace"
        />
      </Row>

      <WorkspaceTable />
    </div>
  );
};
