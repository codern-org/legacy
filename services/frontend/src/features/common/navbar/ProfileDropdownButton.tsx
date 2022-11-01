import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';

type ProfileDropdownButtonProps = {
  onClick?: (event: MouseEvent) => void;
  icon: ComponentChildren,
  text: string,
  responsive?: boolean,
};

export const ProfileDropdownButton = ({
  onClick,
  icon,
  text,
  responsive = false,
}: ProfileDropdownButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-md btn-animate w-full flex flex-row space-x-2"
    >
      <span className="w-6 h-6">{icon}</span>
      <p className={classNames(responsive && 'hidden lg:block')}>{text}</p>
    </button>
  );
};
