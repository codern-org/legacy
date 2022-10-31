import { Text } from '@/features/common/Text';

export const DashboardHeader = () => {
  return (
    <header className="flex flex-col bg-white dark:bg-black border-b dark:border-neutral-700 p-6 transition-colors ease-in duration-200">
      <Text color="primary" className="text-2xl font-semibold mr-auto mb-6">Dashboard</Text>

      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
        <div className="w-full sm:w-fit flex flex-row sm:flex-col justify-between items-center sm:items-end space-x-2 sm:space-x-0 sm:space-y-2 p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors ease-in duration-200">
          <p className="text-black dark:text-white font-semibold">Total Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">1</p>
        </div>

        <div className="w-full sm:w-fit flex flex-row sm:flex-col justify-between items-center sm:items-end space-x-2 sm:space-x-0 sm:space-y-2 p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors ease-in duration-200">
          <p className="text-black dark:text-white font-semibold">Complete Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">0</p>
        </div>
      </div>
    </header>
  );
};
