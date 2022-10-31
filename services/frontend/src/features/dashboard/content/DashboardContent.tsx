import { Text } from '@/features/common/Text';
import { DashboardHeader } from '@/features/dashboard/content/DashboardHeader';
import { WorkspaceContainer } from '@/features/dashboard/content/workspace/WorkspaceContainer';

export const DashboardContent = () => {
  return (
    <main className="w-full h-full flex flex-col transition-colors ease-in duration-200 dark:bg-neutral-900 overflow-hidden">
      <DashboardHeader />

      <section className="container w-full h-full flex flex-col p-6 overflow-hidden">
        <WorkspaceContainer />
      </section>

      <footer className="w-full py-2 text-center border-t border-neutral-200 dark:border-neutral-700">
        <Text color="secondary" className="text-sm">
          © {new Date().getFullYear()} Vectier. All rights reserved.
        </Text>
      </footer>
    </main>
  );
};
