import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';

type RowProps = {
  children: ComponentChildren,
  className?: string,
  center?: 'all' | 'primary' | 'secondary',
};

export const Row = ({
  children,
  className,
  center
}: RowProps) => {
  return (
    <div
      className={classNames(
        'flex flex-row', className,
        (center === 'all') && 'justify-center items-center',
        (center === 'primary') && 'justify-center',
        (center === 'secondary') && 'items-center',
      )}
    >
      {children}
    </div>
  );
};
