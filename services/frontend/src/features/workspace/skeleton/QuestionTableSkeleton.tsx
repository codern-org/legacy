import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { QuestionTableListSkeleton } from '@/features/workspace/skeleton/QuestionTableListSkeleton';
import { ArrowSmallDownIcon } from '@heroicons/react/24/outline';

export const QuestionTableSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center space-x-4 mt-1 mb-7">
        <div className="flex flex-row items-center space-x-2">
          <Text color="primary" className="text-2xl font-semibold">Question</Text>
          <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
        </div>
      </div>

      <table className="table-auto text-left">
        <thead className="bg-neutral-100 dark:bg-neutral-900 outline outline-1 outline-neutral-300 dark:outline-neutral-700 rounded-md transition-all ease-in duration-200">
          <tr>
            <th className="flex flex-row items-center space-x-2 px-4 py-2 font-normal text-neutral-400">
              <span>#</span>
            </th>
            <th className="w-5/12 px-4 py-2 font-normal text-neutral-400">Question</th>
            <th className="hidden md:table-cell px-4 py-2 font-normal text-neutral-400">Level</th>
            <th className="px-4 py-2 font-normal text-neutral-400">Status</th>
            <th className="hidden md:table-cell px-4 py-2 font-normal text-neutral-400">Last submitted</th>
          </tr>
        </thead>
        <tbody>
          {Array(3).fill(0).map(() => (
            <QuestionTableListSkeleton />
          ))}
        </tbody>
      </table>
    </div>
  );
};
