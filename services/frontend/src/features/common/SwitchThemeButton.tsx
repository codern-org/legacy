import { SidebarSubButton } from '@/features/dashboard/sidebar/SidebarSubButton';
import { themeAtom } from '@/store/ThemeStore';
import { Popover, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

export const SwitchThemeButton = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <Popover className="relative flex">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="focus:outline-none flex flex-row items-center space-x-1 px-2 py-1 text-black dark:text-white border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors ease-in duration-200">
            {theme === 'dark'
              ? (<MoonIcon className="w-5 h-5" />)
              : (<SunIcon className="w-5 h-5" />)
            }
            <span className="capitalize">{theme}</span>
            <ChevronUpDownIcon className="w-5 h-5" />
          </Popover.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-in"
            enterFrom="transform scale-80 opacity-0 translate-y-4"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-80 opacity-0 translate-y-4"
          >
            <Popover.Panel className="absolute bottom-0 right-0 border border-neutral-200 dark:border-neutral-700 rounded-md transform -translate-y-10 shadow-lg transition-colors ease-in duration-200">
              <div className="w-52 bg-white dark:bg-black flex flex-col p-2 rounded-lg transition-colors ease-in duration-200">
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
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
