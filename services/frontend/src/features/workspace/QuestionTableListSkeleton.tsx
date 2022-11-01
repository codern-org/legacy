export const QuestionTableListSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-neutral-300 dark:border-neutral-700">
      <td className="px-2 md:px-4 py-6">
        <div className="w-6/12 h-3 bg-neutral-300 dark:bg-neutral-800 rounded-lg mb-2" />
      </td>

      <td className="px-2 md:px-4 py-6">
        <div className="w-6/12 h-3 bg-neutral-300 dark:bg-neutral-800 rounded-lg mb-2" />
        <div className="w-3/12 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </td>

      <td className="hidden md:table-cell px-2 md:px-4 py-6">
        <div className="w-full h-3 bg-neutral-300 dark:bg-neutral-800 rounded-lg mb-2" />
      </td>

      <td className="px-2 md:px-4 py-6">
      <div className="w-full h-3 bg-neutral-300 dark:bg-neutral-800 rounded-lg mb-2" />
      </td>

      <td className="hidden md:table-cell px-2 md:px-4 py-6">
        <div className="w-8/12 h-3 bg-neutral-300 dark:bg-neutral-800 rounded-lg mb-2" />
      </td>
    </tr>
  );
};
