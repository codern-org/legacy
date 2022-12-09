import { Copyright } from '@/features/common/Copyright';
import { Navbar } from '@/features/common/navbar/Navbar';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { WorkspaceDeckSkeleton } from '@/features/dashboard/workspace/skeleton/WorkspaceDeckSkeleton';
import { WorkspaceDeck } from '@/features/dashboard/workspace/WorkspaceDeck';
import { workspacesAtom } from '@/stores/WorkspaceStore';
import { fetch } from '@/utils/Fetch';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';

export const DashboardPage = () => {
  const [workspaces, setWorkspaces] = useAtom(workspacesAtom);

  useEffect(() => {
    // TODO: error handling
    let timer: number;
    fetch
      .get('/workspaces')
      .then((response) => {
        timer = setTimeout(() => setWorkspaces(response.data), 500);
      })
      .catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="w-full h-full flex flex-col transition-theme bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
        <DashboardHeader />

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
