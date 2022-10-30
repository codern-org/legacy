import { Input } from '@/features/common/Input';
import { Row } from '@/features/common/layout/Row';

export const WorkspaceTableHeader = () => {
  return (
    <thead className="text-black dark:text-zinc-500 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-600">
      <tr>
        <th className="p-4 text-sm font-semibold w-5/12">
          <Row center="secondary" className="space-x-4">
            <Input type="checkbox" />
            <p>Workspace</p>
          </Row>
        </th>
        <th className="p-4 text-sm font-semibold w-2/12">Status</th>
        <th className="p-4 text-sm font-semibold w-3/12">Joiner</th>
        <th className="p-4 text-sm font-semibold w-2/12">Progress</th>
      </tr>
    </thead>
  );
};
