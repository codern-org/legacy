import { CodernLogo } from '@/features/common/CodernLogo';
import { ProfileDropdown } from '@/features/common/navbar/ProfileDropdown';
import { Notification } from '@/features/common/Notification';

export const Navbar = () => {
  return (
    <nav className="bg-primary border-b border-primary transition-theme">
      <div className="container flex flex-row justify-between items-center px-6 py-4">
        <CodernLogo className="scale-105" />

        <div className="flex flex-row items-center space-x-4">
          <Notification />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};
