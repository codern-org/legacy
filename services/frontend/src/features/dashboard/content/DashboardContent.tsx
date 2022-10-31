import { DashboardHeader } from '@/features/dashboard/content/DashboardHeader';
import { WorkspaceContainer } from '@/features/dashboard/content/workspace/WorkspaceContainer';

export const DashboardContent = () => {
  return (
    <main className="w-full h-screen flex flex-col transition-colors ease-in duration-200 dark:bg-neutral-900">
      <div className="container flex flex-col w-full h-full p-6 space-y-6">
        <DashboardHeader />
        <WorkspaceContainer />
      </div>
    </main>
  );
};
