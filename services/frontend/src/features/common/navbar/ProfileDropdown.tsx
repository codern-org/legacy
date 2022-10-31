import { Row } from '@/features/common/layout/Row';
import { SwitchThemeButton } from '@/features/common/SwitchThemeButton';
import { Text } from '@/features/common/Text';
import { Popover, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';
import MockupAvatar from '@/assets/mockup-avatar.svg';
import { ProfileDropdownButton } from '@/features/common/navbar/ProfileDropdownButton';

export const ProfileDropdown = () => {
  return (
    <Popover className="relative flex z-[9999]">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-lg hover:border-2 border-black dark:border-neutral-300" />
          </Popover.Button>

          <Transition
            show={open}
            enter="transition duration-200 ease-in"
            enterFrom="transform scale-80 opacity-0 -translate-y-2"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-80 opacity-0 -translate-y-2"
          >
            <Popover.Panel className="absolute top-0 right-0 border border-neutral-300 dark:border-neutral-700 transform translate-y-10 rounded-md shadow-lg transition-colors ease-in duration-200">
              <div className="bg-white dark:bg-black flex flex-col p-2 rounded-lg transition-colors ease-in duration-200">
                <Row center="secondary" className="justify-between space-x-2 px-4 py-2">
                  <Text color="secondary" className="text-sm">Theme</Text>
                  <SwitchThemeButton direction="down" />
                </Row>

                <ProfileDropdownButton
                  icon={<ArrowLeftOnRectangleIcon />}
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
