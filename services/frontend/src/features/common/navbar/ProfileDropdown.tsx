import { SwitchThemeButton } from '@/features/common/SwitchThemeButton';
import { Text } from '@/features/common/Text';
import { Popover, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { ProfileDropdownButton } from '@/features/common/navbar/ProfileDropdownButton';
import { useAuth } from '@/contexts/AuthContext';

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <Popover className="relative flex z-[9999]">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <img src={user.profileUrl} alt="" className="w-8 h-8 rounded-md hover:border-2 border-black dark:border-neutral-300" />
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
            <Popover.Panel className="absolute top-0 right-0 border border-neutral-300 dark:border-neutral-700 transform translate-y-10 rounded-md shadow-lg transition-theme">
              <div className="flex flex-col space-y-2 p-3 bg-white dark:bg-black rounded-md transition-theme">
                <Text color="primary" className="px-2 py-1">{user.email}</Text>

                <span className="flex flex-row justify-between items-center space-x-2 px-2 py-1">
                  <Text color="secondary" className="text-sm">Theme</Text>
                  <div className="scale-90">
                    <SwitchThemeButton direction="down" />
                  </div>
                </span>

                <div className="border-t border-neutral-300 dark:border-neutral-700" />

                <ProfileDropdownButton
                  icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
                  text="Logout"
                  onClick={logout}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
