import { Copyright } from '@/features/common/Copyright';
import { Navbar } from '@/features/common/navbar/Navbar';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { WorkspaceDeckSkeleton } from '@/features/dashboard/workspace/skeleton/WorkspaceDeckSkeleton';
import { WorkspaceDeck } from '@/features/dashboard/workspace/WorkspaceDeck';
import { fetch } from '@/utils/Fetch';
import { PublicWorkspaceWithParticipants } from '@codern/external';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

export const DashboardPage = () => {
  const [workspaces, setWorkspaces] = useState<PublicWorkspaceWithParticipants[] | null>(null);

  useEffect(() => {
    let timer: number;
    fetch
      .get('/workspaces')
      .then((response) => {
        timer = setTimeout(() => setWorkspaces(response.data), 100);
      })
      .catch(() => toast.error('Cannot retrieve workspace data'));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="w-full h-full flex flex-col transition-theme bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        <DashboardHeader workspaces={workspaces} />

        <section className="container w-full h-full flex flex-col p-6 overflow-hidden">
          {workspaces
            ? (<WorkspaceDeck workspaces={workspaces} />)
            : (<WorkspaceDeckSkeleton />)
          }
        </section>

        <footer className="w-full py-2 text-center border-t border-primary">
          <Copyright />
        </footer>
      </main>
    </div>
  );
};
