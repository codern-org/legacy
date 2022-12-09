import { Button } from '@/features/common/Button';
import { Text } from '@/features/common/Text';
import { WorkspaceCard } from '@/features/dashboard/workspace/WorkspaceCard';
import { PublicWorkspaceWithParticipants } from '@codern/external';
import { FunnelIcon, MagnifyingGlassIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input } from '@/features/common/Input';

type WorkspaceDeckProps = {
  workspaces: PublicWorkspaceWithParticipants[],
};

export const WorkspaceDeck = ({
  workspaces,
}: WorkspaceDeckProps) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex flex-row items-center  mb-4">
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
        {workspaces.map((workspace, index) => (
          <WorkspaceCard
            key={index}
            id={workspace.id}
            name={workspace.name}
            creatorId={workspace.ownerId} // TODO: use creator name
            creatorProfile={workspace.profilePath}
            participantsProfile={workspace.participants.map((participant) => participant.profileUrl)}
            progress={10} // TODO: real progress
          />
        ))}
      </div>
    </div>
  );
};
