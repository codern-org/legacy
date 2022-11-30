import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { Text } from '@/features/common/Text';
import { DashboardHeaderCard } from '@/features/dashboard/DashboardHeaderCard';
import { workspacesAtom } from '@/stores/WorkspaceStore';
import { classNames } from '@/utils/Classes';
import { useAtom } from 'jotai';

export const DashboardHeader = () => {
  const [workspaces] = useAtom(workspacesAtom);

  return (
    <header className="bg-neutral-50 dark:bg-black border-b border-primary transition-theme">
      <div className="container w-full overflow-hidden p-6">
        <div className="relative">
          <div className="flex flex-col">
            <Text color="primary" className="text-2xl font-semibold mr-auto mb-4">
              Dashboard
            </Text>
            <div className="flex flex-row space-x-6">
              <DashboardHeaderCard
                label="Total Workspaces"
                value={workspaces ? workspaces.length : 0}
              />
              {/* TODO
              <DashboardHeaderCard
                label="Complete Workspaces"
                value={1}
              /> */}
            </div>
          </div>
          <span className={classNames(
            'hidden md:block absolute right-0 w-56 h-56 overflow-hidden transition-all ease-in duration-500',
            workspaces && 'animate-gelatine',
            workspaces ? '-bottom-16' : '-bottom-32',
          )}>
            <MojiBunMascot />
          </span>
        </div>
      </div>
    </header>
  );
};
