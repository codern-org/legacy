import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Row } from '@/features/common/layout/Row';
import { Text } from '@/features/common/Text';
import { WorkspaceDeck } from '@/features/dashboard/workspace/WorkspaceDeck';
import { PlusSmallIcon, FunnelIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const WorkspaceContainer = () => {
  return (
    <div className="h-full flex flex-col">
      <Row center="secondary" className="mb-4">
        <Text color="primary" className="text-xl font-semibold mr-auto">Workspace</Text>
        <Button color="primary" size="sm">
          <PlusSmallIcon className="w-6 h-6 sm:-mx-2" />
          <span className="hidden sm:block">Add Workspace</span>
        </Button>
      </Row>

      {/* TODO: make <Row> responsive */}
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

      <WorkspaceDeck />
    </div>
  );
};
