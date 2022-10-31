import { CodernLogo } from '@/features/common/CodernLogo';
import { BellIcon } from '@heroicons/react/24/outline';
import { ProfileDropdown } from '@/features/common/navbar/ProfileDropdown';

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-black border-b border-neutral-300 dark:border-neutral-700 transition-colors ease-in duration-200">
      <div className="container flex flex-row justify-between items-center px-6 py-4">
        <CodernLogo className="scale-105" />

        <div className="flex flex-row items-center space-x-4">
          <BellIcon className="w-6 h-6 text-neutral-400 hover:text-black dark:hover:text-white transition-colors ease-in duration-200" />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};
