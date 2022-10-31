import { CodernLogo } from '@/features/common/CodernLogo';
import { Text } from '@/features/common/Text';
import { SidebarAccountFooter } from '@/features/dashboard/sidebar/SidebarAccountFooter';
import { SidebarSubButton } from '@/features/dashboard/sidebar/SidebarSubButton';
import { BellIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const DashboardSidebar = () => {
  return (
    <nav className="w-full max-w-fit h-full flex flex-col bg-neutral-50 dark:bg-black border-r border-neutral-200 dark:border-neutral-700 transition-colors ease-in duration-200">
      <CodernLogo className="p-6" />

      <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 transition-colors ease-in duration-200">
        <Text color="secondary" className="text-sm">Pinned Workspace</Text>
        {/* TODO: add more menu */}
      </div>

      <div className="mx-2 mt-auto mb-8">
        <SidebarSubButton
          icon={<BellIcon className="w-6 h-6" />}
          text="Notifications"
        />
        <SidebarSubButton
          icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
          text="Support"
        />
        <SidebarSubButton
          icon={<Cog6ToothIcon className="w-6 h-6" />}
          text="Settings"
        />
      </div>

      <SidebarAccountFooter />
    </nav>
  );
};
