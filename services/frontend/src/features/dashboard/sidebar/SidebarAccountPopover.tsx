import { Row } from '@/features/common/layout/Row';
import { SwitchThemeButton } from '@/features/common/SwitchThemeButton';
import { Text } from '@/features/common/Text';
import { SidebarSubButton } from '@/features/dashboard/sidebar/SidebarSubButton';
import { Popover, Transition } from '@headlessui/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { ComponentChildren } from 'preact';
import { route } from 'preact-router';

type SidebarAccountPopoverProps = {
  button: (open: boolean) => ComponentChildren,
};

export const SidebarAccountPopover = ({
  button,
}: SidebarAccountPopoverProps) => {
  return (
    <Popover className="relative flex z-[9999]">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="focus:outline-none">
            {button(open)}
          </Popover.Button>

          <Transition
            show={open}
            enter="transition duration-200 ease-in"
            enterFrom="transform scale-80 opacity-0 translate-y-3"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-80 opacity-0 translate-y-3"
          >
            <Popover.Panel className="absolute bottom-0 border border-neutral-200 dark:border-neutral-700 transform translate-x-8 rounded-md shadow-lg transition-colors ease-in duration-200">
              <div className="w-52 bg-white dark:bg-black flex flex-col p-2 rounded-lg transition-colors ease-in duration-200">
                <Row center="secondary" className="justify-between px-4 py-2">
                  <Text color="secondary" className="text-sm">Theme</Text>
                  <SwitchThemeButton />
                </Row>
                <SidebarSubButton
                  icon={<ArrowLeftOnRectangleIcon className="w-6 h-6" />}
                  text="Logout"
                  onClick={() => route('/')}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
