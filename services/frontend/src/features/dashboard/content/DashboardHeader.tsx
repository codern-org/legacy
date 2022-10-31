import { Text } from '@/features/common/Text';

export const DashboardHeader = () => {
  return (
    <header className="flex flex-col bg-white dark:bg-black border-b dark:border-neutral-700 -mx-6 -mt-6 px-6 pt-6 transition-colors ease-in duration-200">
      <Text color="primary" className="text-2xl font-semibold mr-auto mb-6">Dashboard</Text>
      <div className="flex flex-row space-x-6 mb-6">
        <div className="w-fit p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-2 transition-colors ease-in duration-200">
          <p className="text-black dark:text-white font-semibold">Total Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">1</p>
        </div>
        <div className="w-fit p-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-lg space-y-2 transition-colors ease-in duration-200">
          <p className="text-black dark:text-white font-semibold">Complete Workspaces</p>
          <p className="text-xl font-bold text-right dark:text-white">0</p>
        </div>
      </div>
    </header>
  );
};
