type ProgressBarProps = {
  progress: number,
};

export const ProgressBar = ({
  progress,
}: ProgressBarProps) => {
  return (
    <span className="bg-neutral-300 dark:bg-neutral-700 w-full h-2.5 rounded-full transition-theme">
      <div
        className="h-2.5 bg-neutral-700 dark:bg-neutral-400 rounded-full transition-theme" style={`width: ${progress}%`}
      />
    </span>
  );
};
