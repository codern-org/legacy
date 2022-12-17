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
      className="w-full flex flex-row items-center space-x-1 px-2 py-1 hover:bg-neutral-300 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white rounded-md btn-animate"
    >
      {icon}
      <p className={classNames(responsive && 'hidden lg:block')}>{text}</p>
    </button>
  );
};
