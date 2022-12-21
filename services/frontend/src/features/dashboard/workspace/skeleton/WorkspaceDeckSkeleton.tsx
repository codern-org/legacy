import { Button } from '@/features/common/Button';
import { Text } from '@/features/common/Text';
import { WorkspaceCardSkeleton } from '@/features/dashboard/workspace/skeleton/WorkspaceCardSkeleton';

export const WorkspaceDeckSkeleton = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex flex-row items-center mb-4">
        <Text color="primary" className="text-xl font-semibold mr-auto">Workspace</Text>
        <Button color="primary" size="sm" className="w-9 sm:w-32 h-8 animate-pulse">
          <span className="hidden sm:block"></span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row mb-6 lg:space-x-2 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-2/3 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-md" />

        <div className="w-full flex flex-row space-x-2">
          <div className="w-28 h-8 lg:h-10 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
          <div className="w-28 h-8 lg:h-10 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
        </div>
      </div>

      <div className="overflow-y-auto space-y-4 sm:space-y-0 sm:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array(5).fill(0).map(() => (
          <WorkspaceCardSkeleton />
        ))}
      </div>
    </div>
  );
};
