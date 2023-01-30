import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

type QuestionPaneSkeletonProps = {
  workspaceId: string,
}

export const QuestionPaneSkeleton = ({
  workspaceId,
}: QuestionPaneSkeletonProps) => {
  return (
    <div className="w-full h-full flex flex-col p-6 border border-primary rounded-lg animate-pulse">
      <div className="flex flex-row justify-between items-center mb-3 pb-3 border-b border-primary">
        <div className="flex flex-row items-center my-1.5">
          <ChevronLeftIcon
            className="w-7 h-7 mr-1 p-1 text-black dark:text-white hover:text-neutral-400 dark:hover:text-neutral-400 hover:cursor-pointer"
            onClick={() => route(`/workspace/${workspaceId}`)}
          />

          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <div className="w-32 h-3 bg-neutral-300 dark:bg-neutral-600 rounded-lg mb-2" />
            </div>
            <div className="flex flex-row space-x-2">
              <div className="w-32 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
              <div className="w-32 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="w-14 h-6 mb-2 border border-primary rounded-lg" />
      </div>

      <div className="flex flex-row mb-2 space-x-2 pb-3 border-b border-primary">
        <div className="w-2/12 h-8 border border-primary rounded-lg" />
        <div className="w-2/12 h-8 border border-primary rounded-lg" />
      </div>

      <div className="py-4">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="w-8/12 h-4 bg-neutral-300 dark:bg-neutral-600 rounded-lg" />
          <div className="w-8/12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
          <div className="w-10/12 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-10/12 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-10/12 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-10/12 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
          <div className="w-10/12 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
        </div>

        <div className="w-full h-32 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
      </div>
    </div>
  );
};
