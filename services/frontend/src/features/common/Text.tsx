import { classNames } from '@/utils/Common';
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
      (color === 'secondary') && 'text-neutral-400',
      className,
    )}>
      {children}
    </p>
  );
};
