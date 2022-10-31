import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Row } from '@/features/common/layout/Row';
import { Text } from '@/features/common/Text';
import { WorkspaceDeck } from '@/features/dashboard/content/workspace/WorkspaceDeck';
import { PlusSmallIcon, FunnelIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const WorkspaceContainer = () => {
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <Row center="secondary" className="mb-4">
        <Text color="primary" className="text-xl font-semibold mr-auto">Workspace</Text>
        <Button color="primary" size="sm">
          <PlusSmallIcon className="w-6 h-6 -mx-2" />
          <span>Add Workspace</span>
        </Button>
      </Row>

      <Row className="justify-between mb-6">
        <Row className="space-x-2">
          <Input
            type="text"
            icon={<MagnifyingGlassIcon />}
            placeholder="Search workspace"
            className=""
          />

          <Button color="secondary" size="sm">
            <FunnelIcon className="w-5 h-5" />
            <span>Filters</span>
          </Button>

          <Button color="secondary" size="sm">
            <span>All time</span>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        </Row>
      </Row>

      <WorkspaceDeck />
    </div>
  );
};
