import { Row } from '@/features/common/layout/Row';
import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'checkbox',
  label?: string,
  placeholder?: string,
  icon?: ComponentChildren,
  className?: string,
};

export const Input = ({
  type,
  label,
  placeholder,
  icon,
  className,
}: InputProps) => {
  if (type === 'checkbox') {
    return (
      <div className="flex flex-row">
        <input type="checkbox" className="accent-black dark:accent-white" />
        <label className="ml-2 text-neutral-500">{label}</label>
      </div>
    );
  }

  return (
    <div className={classNames('flex flex-col', className)}>
      {label && <label className="block mb-2 text-neutral-500">{label}</label>}
      <Row
        center="secondary"
        className="w-full text-black dark:text-white dark:bg-black border border-neutral-300 dark:border-neutral-600 rounded-md focus-within:border focus-within:border-black dark:focus-within:border-neutral-300 transition-colors ease-in duration-200"
      >
        {icon && (
          <div className="pl-3">
            <div className="w-4 h-4 text-black dark:text-white">{icon}</div>
          </div>
        )}
        <input
          type={type} 
          className="w-full px-3 py-2 bg-transparent focus:outline-none"
          placeholder={placeholder}
        />
      </Row>
    </div>
  );
};
