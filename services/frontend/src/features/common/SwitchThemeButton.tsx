import { Text } from '@/features/common/Text';
import { useTheme } from '@/hooks/useTheme';
import { classNames } from '@/utils/Classes';
import { Popover, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { ComponentChildren } from 'preact';

type SwitchThemeButtonProps = {
  direction: 'top' | 'down',
};

export const SwitchThemeButton = ({
  direction,
}: SwitchThemeButtonProps) => {
  const [theme, setTheme] = useTheme();

  return (
    <Popover className="relative flex">
      {({ open }: { open: boolean }) => (
        <>
          <Popover.Button className="w-[7.5rem] border border-neutral-300 dark:border-neutral-600 rounded-md transition-theme focus:outline-none">
            <Text className="flex flex-row justify-between items-center px-2 py-1">
              <div className="flex flex-row items-center space-x-1">
                {(theme === 'system') && (<ComputerDesktopIcon className="w-5 h-5" />)}
                {(theme === 'dark') && (<MoonIcon className="w-5 h-5" />)}
                {(theme === 'light') && (<SunIcon className="w-5 h-5" />)}
                <p className="capitalize">{theme}</p>
              </div>
              <ChevronUpDownIcon className="w-5 h-5" />
            </Text>
          </Popover.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-in"
            enterFrom={classNames(
              "transform scale-80 opacity-0",
              (direction == 'top') && 'translate-y-4',
              (direction == 'down') && '-translate-y-4',
            )}
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo={classNames(
              "transform scale-80 opacity-0",
              (direction == 'top') && 'translate-y-4',
              (direction == 'down') && '-translate-y-4',
            )}
          >
            <Popover.Panel className={classNames(
              'absolute border border-neutral-300 dark:border-neutral-700 rounded-md transform shadow-lg transition-theme',
              (direction === 'top') && 'bottom-0 right-0 -translate-y-10',
              (direction === 'down') && 'top-0 right-0 translate-y-10',
            )}>
              <div className="bg-white dark:bg-black flex flex-col p-2 rounded-md transition-theme">
                <ThemeSelector
                  icon={<ComputerDesktopIcon />}
                  text="System"
                  onClick={() => setTheme('system')}
                />
                <ThemeSelector
                  icon={<MoonIcon />}
                  text="Dark"
                  onClick={() => setTheme('dark')}
                />
                <ThemeSelector
                  icon={<SunIcon />}
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

type ThemeSelectorProps = {
  onClick?: (event: MouseEvent) => void;
  icon: ComponentChildren,
  text: string,
};

const ThemeSelector = ({
  onClick,
  icon,
  text,
}: ThemeSelectorProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex flex-row items-center space-x-2 px-3 py-2 text-sm hover:bg-neutral-300 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-md"
    >
      <span className="w-5 h-5">{icon}</span>
      <p>{text}</p>
    </button>
  );
};
