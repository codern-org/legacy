import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { useTheme } from '@/hooks/useTheme';

export const LoadingScreen = () => {
  useTheme(); // Prelaod theme

  return (
    <div className="h-screen flex justify-center items-center dark:bg-black">
      <MojiBunMascot className="w-32 h-32 animate-pulse" />
    </div>
  );
};
