import { Row } from '@/features/common/layout/Row';
import { ComponentChildren } from 'preact';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'checkbox',
  label?: string,
  placeholder?: string,
  icon?: ComponentChildren,
};

export const Input = ({
  type,
  label,
  placeholder,
  icon,
}: InputProps) => {
  if (type === 'checkbox') {
    return (
      <div className="flex flex-row">
        <input type="checkbox" className="accent-black dark:accent-white" />
        <label className="ml-2 text-zinc-500">{label}</label>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {label && <label className="block mb-2 text-zinc-500">{label}</label>}
      <Row
        center="secondary"
        className="w-full text-black dark:text-white dark:bg-black border border-zinc-500 rounded-md focus-within:outline"
      >
        {icon && (
          <div className="pl-2">
            <div className="w-4 h-4 text-black dark:text-white">{icon}</div>
          </div>
        )}
        <input
          type={type} 
          className="w-full px-3 py-2 dark:bg-black focus:outline-none rounded-md"
          placeholder={placeholder}
        />
      </Row>
    </div>
  );
};
