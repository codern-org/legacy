import { DashboardHeader } from '@/features/dashboard/content/DashboardHeader';
import { WorkspaceContainer } from '@/features/dashboard/content/workspace/WorkspaceContainer';

export const DashboardContent = () => {
  return (
    <main className="w-full h-full flex flex-col transition-colors ease-in duration-200 dark:bg-neutral-900 overflow-hidden">
      <DashboardHeader />

      <section className="container w-full h-full flex flex-col p-6 overflow-hidden">
        <WorkspaceContainer />
      </section>
    </main>
  );
};
