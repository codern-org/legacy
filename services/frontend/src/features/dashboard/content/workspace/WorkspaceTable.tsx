import { WorkspaceTableList } from '@/features/dashboard/content/workspace/WorkspaceTableList';
import { WorkspaceTableFooter } from '@/features/dashboard/content/workspace/WorkspaceTableFooter';
import { WorkspaceTableHeader } from '@/features/dashboard/content/workspace/WorkspaceTableHeader';

export const WorkspaceTable = () => {
  return (
    <div className="relative bg-white dark:bg-black border border-zinc-200 dark:border-zinc-600 overflow-x-auto rounded-lg">
      <table className="w-full table-auto text-left">
        <WorkspaceTableHeader />
        <tbody>
          <WorkspaceTableList />
          <WorkspaceTableFooter />
        </tbody>
      </table>
    </div>
  );
};
