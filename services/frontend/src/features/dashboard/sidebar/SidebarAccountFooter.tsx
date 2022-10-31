import MockupAvatar from '@/assets/mockup-avatar.svg';
import { Row } from '@/features/common/layout/Row';
import { SidebarAccountPopover } from '@/features/dashboard/sidebar/SidebarAccountPopover';
import { classNames } from '@/utils/Classes';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export const SidebarAccountFooter = () => {
  return (
    <Row center="secondary" className="p-4 border-t border-neutral-200 dark:border-neutral-700 transition-colors ease-in duration-200">
      <Row center="secondary" className="lg:mr-12 space-x-4">
        <img src={MockupAvatar} alt="" className="hidden lg:block w-10 h-10 rounded-lg" />
        <div className="hidden lg:block">
          <p className="text-sm font-medium dark:text-white leading-snug">Krid Heprakhone</p>
          <p className="text-xs text-neutral-400 leading-snug">riflowth@gmail.com</p>
        </div>
      </Row>

      <div className="block lg:hidden">
        <SidebarAccountPopover
          button={() => (<img src={MockupAvatar} alt="" className="w-10 h-10 rounded-lg" />)}
        />
      </div>

      <div className="hidden lg:block">
        <SidebarAccountPopover
          button={(open) => (
            <ChevronUpDownIcon
              className={classNames(
                'w-6 h-6 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300',
                open && 'text-neutral-800 dark:text-neutral-300',
              )}
            />
          )}
        />
      </div>
    </Row>
  );
};
