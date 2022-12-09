import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

export const WorkspaceTopPanelSkeleton = () => {
  return (
    <div className="flex flex-row justify-between items-center space-x-2 mb-6 pb-6 border-b border-neutral-300 dark:border-neutral-700 transition-theme">
      <div className="flex flex-row items-center space-x-2 animate-pulse">
        <ChevronLeftIcon
          className="w-6 h-6 mr-1 text-black dark:text-white hover:cursor-pointer"
          onClick={() => route('/dashboard')}
        />
        <span
          className="w-10 h-10 flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 rounded-md transition-theme"
        />
        <div className="space-y-2">
          <div className="w-24 h-5 bg-neutral-300 dark:bg-neutral-800 rounded-lg" />
          <div className="w-24 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
