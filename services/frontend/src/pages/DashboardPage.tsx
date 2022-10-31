import { Navbar } from '@/features/common/navbar/Navbar';
import { Text } from '@/features/common/Text';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { WorkspaceContainer } from '@/features/dashboard/workspace/WorkspaceContainer';

type DashboardPageProps = {
  path: string,
};

export const DashboardPage = ({
  path,
}: DashboardPageProps) => {
  return (
    <main className="h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <div className="w-full h-full flex flex-col transition-colors ease-in duration-200 dark:bg-neutral-900 overflow-hidden">
        <DashboardHeader />

        <section className="container w-full h-full flex flex-col p-6 overflow-hidden">
          <WorkspaceContainer />
        </section>

        <footer className="w-full py-2 text-center border-t border-neutral-300 dark:border-neutral-700">
          <Text color="secondary" className="text-sm">
            © {new Date().getFullYear()} Vectier. All rights reserved.
          </Text>
        </footer>
      </div>
    </main>
  );
};
