import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';

type TextProps = {
  children: ComponentChildren,
  color?: 'primary' | 'secondary',
  className?: string,
};

export const Text = ({
  children,
  color = 'primary',
  className,
}: TextProps) => {
  return (
    <p className={classNames(
      (color === 'primary') && 'text-black dark:text-white',
      (color === 'secondary') && 'text-zinc-400',
      className,
    )}>
      {children}
    </p>
  );
};
