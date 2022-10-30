import { CodernLogo } from '@/features/common/CodernLogo';
import { Text } from '@/features/common/Text';
import { SidebarAccountFooter } from '@/features/dashboard/sidebar/SidebarAccountFooter';
import { SidebarSubButton } from '@/features/dashboard/sidebar/SidebarSubButton';
import { BellIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export const DashboardSidebar = () => {
  return (
    <nav className="h-full flex flex-col bg-zinc-50 dark:bg-black border-r border-zinc-200 dark:border-zinc-600">
      <CodernLogo className="p-6" />

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-600">
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
