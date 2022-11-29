import { Copyright } from '@/features/common/Copyright';
import { Navbar } from '@/features/common/navbar/Navbar';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { WorkspaceDeck } from '@/features/dashboard/workspace/WorkspaceDeck';

export const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="w-full h-full flex flex-col transition-theme bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        <DashboardHeader />

        <section className="container w-full h-full flex flex-col p-6 overflow-hidden">
          <WorkspaceDeck />
        </section>

        <footer className="w-full py-2 text-center border-t border-primary">
          <Copyright />
        </footer>
      </main>
    </div>
  );
};
