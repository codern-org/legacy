import { Text } from '@/features/common/Text';

export const DashboardHeader = () => {
  return (
    <header className="bg-neutral-50 dark:bg-black border-b border-neutral-300 dark:border-neutral-700 transition-colors ease-in duration-200">
      <div className="container flex flex-col p-6">
        <Text color="primary" className="text-2xl font-semibold mr-auto mb-4">Dashboard</Text>

        <div className="flex flex-row space-x-6">
          <div className="w-full sm:w-fit flex flex-row justify-between items-center space-x-2 px-4 py-2 md:p-4 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-md shadow transition-colors ease-in duration-200">
            <Text color="secondary" className="text-sm md:text-base">Total Workspaces</Text>
            <p className="text-lg md:text-xl font-bold text-right dark:text-white">21</p>
          </div>

          <div className="w-full sm:w-fit flex flex-row justify-between items-center space-x-2 px-4 py-2 md:p-4 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-md shadow transition-colors ease-in duration-200">
            <Text color="secondary" className="text-sm md:text-base">Complete Workspaces</Text>
            <p className="text-lg md:text-xl font-bold text-right dark:text-white">0</p>
          </div>
        </div>
      </div>
    </header>
  );
};
