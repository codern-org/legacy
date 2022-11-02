export const QuestionPangeSkeleton = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="w-32 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-lg mb-6" />

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
