import { MojiBunMascot } from '@/features/common/MojiBunMascot';

export const EditorPaneSkeleton = () => {
  return (
    <div className="relative w-full h-full rounded-lg border border-primary">
      <MojiBunMascot className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
  );
};
