import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { Text } from '@/features/common/Text';
import { DashboardHeaderCard } from '@/features/dashboard/DashboardHeaderCard';

export const DashboardHeader = () => {
  return (
    <header className="bg-neutral-50 dark:bg-black border-b border-primary transition-theme">
      <div className="container w-full overflow-hidden p-6">
        <div className="relative">
          <div className="flex flex-col">
            <Text color="primary" className="text-2xl font-semibold mr-auto mb-4">
              Dashboard
            </Text>
            <div className="flex flex-row space-x-6">
              <DashboardHeaderCard label="Total Workspaces" value="21" />
              <DashboardHeaderCard label="Complete Workspaces" value="0" />
            </div>
          </div>
          <span className="hidden md:block absolute -bottom-16 right-0 w-56 h-56 overflow-hidden animate-gelatine">
            <MojiBunMascot />
          </span>
        </div>
      </div>
    </header>
  );
};
