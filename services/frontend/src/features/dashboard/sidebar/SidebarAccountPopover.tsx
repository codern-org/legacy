import { SidebarSubButton } from '@/features/dashboard/sidebar/SidebarSubButton';
import { themeAtom } from '@/store/ThemeStore';
import { classNames } from '@/utils/Classes';
import { Popover, Transition } from '@headlessui/react';
import { ArrowLeftOnRectangleIcon, ChevronUpDownIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { route } from 'preact-router';

export const SidebarAccountPopover = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <Popover className="relative flex">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <ChevronUpDownIcon
              className={classNames(
                'w-6 h-6 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300',
                open && 'text-zinc-800 dark:text-zinc-300',
              )}
            />
          </Popover.Button>

          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-80 opacity-0 translate-y-24"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-80 opacity-0 translate-y-24"
          >
            <Popover.Panel className="absolute bottom-0 border border-zinc-200 dark:border-zinc-600 transform translate-x-8 rounded-md shadow-lg">
              <div className="w-52 bg-white dark:bg-black flex flex-col p-2 rounded-lg shadow">
                <SidebarSubButton
                  icon={<ComputerDesktopIcon className="w-6 h-6" />}
                  text="System"
                  onClick={() => setTheme('system')}
                />
                <SidebarSubButton
                  icon={<MoonIcon className="w-6 h-6" />}
                  text="Dark"
                  onClick={() => setTheme('dark')}
                />
                <SidebarSubButton
                  icon={<SunIcon className="w-6 h-6" />}
                  text="Light"
                  onClick={() => setTheme('light')}
                />
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
