import { ComponentChildren } from 'preact';

type SidebarSubButtonProps = {
  onClick?: (event: MouseEvent) => void;
  icon: ComponentChildren,
  text: string,
};

export const SidebarSubButton = ({
  onClick,
  icon,
  text,
}: SidebarSubButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white rounded-lg btn-animate w-full flex flex-row space-x-2"
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};
