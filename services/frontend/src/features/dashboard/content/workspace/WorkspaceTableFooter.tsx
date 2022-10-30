import { Button } from '@/features/common/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const WorkspaceTableFooter = () => {
  return (
    <tr>
      <td colSpan={4} className="w-full px-4 py-3">
        <div className="w-full flex justify-center items-center space-x-8">
          <Button size="sm" color="secondary">
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <p className="text-zinc-500">Page 1 of 1</p>
          <Button size="sm" color="secondary">
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
