import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { WorkspaceCard } from '@/features/dashboard/workspace/WorkspaceCard';
import { WorkspaceCardSkeleton } from '@/features/dashboard/workspace/WorkspaceCardSkeleton';
import { mockWorkspaces } from '@/store/mockup/WorkspaceMockup';
import { workspacesAtom } from '@/store/WorkspaceStore';
import { PlusSmallIcon, FunnelIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';

export const WorkspaceDeck = () => {
  const [workspaces, setWorkspaces] = useAtom(workspacesAtom);

  // TODO: real fetch
  useEffect(() => {
    setTimeout(() => {
      setWorkspaces(mockWorkspaces);
    }, 1500);
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex flex-row mb-4">
        <Text color="primary" className="text-xl font-semibold mr-auto">Workspace</Text>
        <Button color="primary" size="sm">
          <PlusSmallIcon className="w-6 h-6 sm:-mx-2" />
          <span className="hidden sm:block">Add Workspace</span>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row mb-6 lg:space-x-2 space-y-4 lg:space-y-0">
        <Input
          type="text"
          icon={<MagnifyingGlassIcon />}
          placeholder="Search workspace"
          className=""
        />

        <div className="flex flex-row space-x-2">
          <Button color="secondary" size="sm">
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </Button>

          <Button color="secondary" size="sm">
            <span>All time</span>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto space-y-4 sm:space-y-0 sm:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {(!workspaces) && Array(5).fill(0).map(() => (
          <WorkspaceCardSkeleton />
        ))}

        {(workspaces) && workspaces.map((workspace, index) => (
          <WorkspaceCard
            key={index}
            title={workspace.title}
            creator={workspace.creator}
            creatorProfile={workspace.creatorProfile}
            participants={workspace.participants}
            progress={workspace.progress}
          />
        ))}
      </div>
    </div>
  );
};
