export const QuestionPaneSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 border border-primary rounded-lg animate-pulse">
      <div className="flex flex-row justify-between items-center mb-4 border-b border-primary">
        <div className="w-32 h-3 bg-neutral-300 dark:bg-neutral-600 rounded-lg mb-6" />
        <div className="w-14 h-5 mb-6 border border-primary rounded-lg" />
      </div>

      <div className="flex flex-row mb-8 space-x-2 pb-4 border-b border-primary">
        <div className="w-2/12 h-8 border border-primary rounded-lg" />
        <div className="w-2/12 h-8 border border-primary rounded-lg" />
      </div>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="w-8/12 h-4 bg-neutral-300 dark:bg-neutral-600 rounded-lg" />
        <div className="w-8/12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        <div className="w-10/12 h-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
        <div className="w-10/12 h-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
        <div className="w-10/12 h-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
        <div className="w-10/12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        <div className="w-10/12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>

      <div className="w-full h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
    </div>
  );
};
