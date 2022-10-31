import { Text } from '@/features/common/Text';

export const DashboardHeader = () => {
  return (
    <header className="bg-neutral-50 dark:bg-black border-b dark:border-neutral-700 transition-colors ease-in duration-200">
      <div className="container flex flex-col p-6">
        <Text color="primary" className="text-2xl font-semibold mr-auto mb-4">Dashboard</Text>

        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
          <div className="w-full sm:w-fit flex flex-row justify-between items-center space-x-2 p-4 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-lg shadow transition-colors ease-in duration-200">
            <Text color="secondary">Total Workspaces</Text>
            <p className="text-xl font-bold text-right dark:text-white">1</p>
          </div>

          <div className="w-full sm:w-fit flex flex-row justify-between items-center space-x-2 p-4 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-700 rounded-lg shadow transition-colors ease-in duration-200">
            <Text color="secondary">Complete Workspaces</Text>
            <p className="text-xl font-bold text-right dark:text-white">0</p>
          </div>
        </div>
      </div>
    </header>
  );
};
