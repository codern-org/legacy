import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { MagnifyingGlassIcon, ArrowSmallDownIcon } from '@heroicons/react/24/outline';

export const QuestionsTable = () => {
  // TODO: breakdown into component

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center space-x-4 mb-6">
        <div className="flex flex-row items-center space-x-2">
          <Text color="primary" className="text-2xl font-semibold">Question</Text>
          <Text color="secondary">(3)</Text>
        </div>

        <Input
          type="text"
          icon={<MagnifyingGlassIcon />}
          placeholder="Search by name, description, status"
          className="w-96"
        />
      </div>

      <table className="table-auto text-left">
        <thead className="bg-neutral-50 dark:bg-neutral-900 outline outline-1 outline-neutral-300 dark:outline-neutral-700 rounded-md transition-all ease-in duration-200">
          <tr>
            <th className="flex flex-row items-center space-x-2 px-4 py-2 font-normal text-neutral-400">
              <span>#</span>
              <ArrowSmallDownIcon className="w-4 h-4" />
            </th>
            <th className="w-6/12 px-4 py-2 font-normal text-neutral-400">Question</th>
            <th className="hidden md:table-cell px-4 py-2 font-normal text-neutral-400">Level</th>
            <th className="px-4 py-2 font-normal text-neutral-400">Status</th>
            <th className="hidden md:table-cell px-4 py-2 font-normal text-neutral-400">Last submitted</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="px-2 md:px-4 py-4">
              <Text color="secondary">1</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <Text color="primary">Porama walker</Text>
              <Text color="secondary" className="hidden md:block text-sm">The hardest path algorithm ever</Text>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">Hard</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <div className="flex flex-row items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <Text color="secondary" className="text-sm md:text-base">Wait</Text>
              </div>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">{new Date().toLocaleDateString('th-TH')}</Text>
            </td>
          </tr>

          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="px-2 md:px-4 py-4">
              <Text color="secondary">2</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <Text color="primary">Keeratikorn Eating</Text>
              <Text color="secondary" className="hidden md:block text-sm">The easiest noodle algorithm</Text>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">Easy</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <div className="flex flex-row items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <Text color="secondary" className="text-sm md:text-base">Done</Text>
              </div>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">{new Date().toLocaleDateString('th-TH')}</Text>
            </td>
          </tr>

          <tr className="border-b border-neutral-300 dark:border-neutral-700">
            <td className="px-2 md:px-4 py-4">
              <Text color="secondary">3</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <Text color="primary">Chicken</Text>
              <Text color="secondary" className="hidden md:block text-sm">Need to eat a chicken before code</Text>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">Easy</Text>
            </td>
            <td className="px-2 md:px-4 py-4">
              <div className="flex flex-row items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <Text color="secondary" className="text-sm md:text-base">Error</Text>
              </div>
            </td>
            <td className="hidden md:table-cell px-2 md:px-4 py-4">
              <Text color="secondary">{new Date().toLocaleDateString('th-TH')}</Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
