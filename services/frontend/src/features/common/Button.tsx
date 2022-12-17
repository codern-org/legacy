import { Spinner } from '@/features/common/Spinner';
import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';
import { route } from 'preact-router';

type ButtonProps = {
  children: ComponentChildren,
  type?: 'button' | 'submit',
  loading?: boolean,
  color?: 'primary' | 'secondary',
  size?: 'base' | 'sm',
  href?: string,
  active?: boolean,
  className?: string,
  onClick?: (event: MouseEvent) => void,
};

const buttonClasses = {
  common: 'flex flex-row justify-center items-center space-x-2 border rounded-md ease-in duration-200',
  size: {
    'base': 'px-4 py-2',
    'sm': 'px-2 py-1',
  },
  color: {
    'primary': 'text-white hover:text-black dark:text-black dark:hover:text-white bg-black hover:bg-white dark:bg-white dark:hover:bg-black border-black dark:border-white',
    'secondary': 'text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white',
  },
  active: {
    'primary': 'text-black dark:text-white bg-white dark:bg-black border-black dark:border-white',
    'secondary': 'text-black dark:text-white border-black dark:border-white',
  }
};

export const Button = ({
  children,
  loading,
  type = 'button',
  color = 'primary',
  size = 'base',
  href,
  active,
  className,
  onClick,
}: ButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (onClick) onClick(event);
  };

  if (href) {
    return (
      <a
        className={classNames(
          className,
          buttonClasses.common,
          buttonClasses.size[size],
          !active && buttonClasses.color[color],
          active && buttonClasses.active[color],
        )}
        href={href}
      >
        {loading && (
          <div className="w-4 h-4 mr-2 animate-spin"><Spinner /></div>
        )}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames(
        className,
        buttonClasses.common,
        buttonClasses.size[size],
        !active && buttonClasses.color[color],
        active && buttonClasses.active[color],
      )}
      onClick={handleClick}
    >
      {loading && (
        <div className="w-4 h-4 mr-2 animate-spin"><Spinner /></div>
      )}
      {children}
    </button>
  );
};
