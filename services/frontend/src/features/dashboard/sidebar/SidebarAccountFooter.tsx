import MockupAvatar from '@/assets/mockup-avatar.svg';
import { Row } from '@/features/common/layout/Row';
import { SidebarAccountPopover } from '@/features/dashboard/sidebar/SidebarAccountPopover';

export const SidebarAccountFooter = () => {
  return (
    <Row center="secondary" className="p-4 border-t border-zinc-200 dark:border-zinc-600">
      <Row center="secondary" className="mr-12 space-x-4">
        <img src={MockupAvatar} alt="" className="w-10 h-10 rounded-lg" />
        <div>
          <p className="text-sm font-medium dark:text-white leading-snug">Krid Heprakhone</p>
          <p className="text-xs text-zinc-400 leading-snug">riflowth@gmail.com</p>
        </div>
      </Row>
      <SidebarAccountPopover />
    </Row>
  );
};