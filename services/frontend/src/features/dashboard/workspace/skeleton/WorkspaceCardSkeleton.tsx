export const WorkspaceCardSkeleton = () => {
  return (
    <div className="flex flex-col p-6 border rounded-md bg-primary shadow-md transition-all ease-in duration-300 border-primary animate-pulse">
      <div className="flex flex-row items-center space-x-2 mb-4">
        <span className="flex-none w-10 h-10 bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-theme" />
        <div className="w-full flex flex-col items-start">
          <div className="w-4/12 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg mb-2" />
          <div className="w-4/12 h-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <div className="w-2/12 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg mb-1" />

        <div className="flex flex-row items-center -space-x-3 mt-1 mb-2 transform -translate-x-1">
          <div className="w-7 h-7 bg-neutral-300 dark:bg-neutral-800 border-4 border-white dark:border-black rounded-full" />
          <div className="w-7 h-7 bg-neutral-300 dark:bg-neutral-800 border-4 border-white dark:border-black rounded-full" />
          <div className="w-7 h-7 bg-neutral-300 dark:bg-neutral-800 border-4 border-white dark:border-black rounded-full" />
        </div>
      </div>

      <div className="flex flex-col items-start mt-auto">
        <div className="w-2/12 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-lg mb-2" />
        <div className="w-full h-3 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
      </div>
    </div>
  );
};
