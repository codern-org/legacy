import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'checkbox',
  label?: string,
  placeholder?: string,
  icon?: ComponentChildren,
  className?: string,
  onInput?: (event: Event) => void,
  value?: string,
};

export const Input = ({
  type,
  label,
  placeholder,
  icon,
  className,
  onInput,
  value,
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
      <div className="w-full flex flex-row items-center text-black dark:text-white bg-primary border border-primary rounded-md focus-within:border focus-within:border-black dark:focus-within:border-neutral-300 transition-theme">
        {icon && (
          <div className="pl-3">
            <Text className="w-4 h-4">{icon}</Text>
          </div>
        )}
        <input
          type={type} 
          className="w-full px-3 py-2 bg-transparent focus:outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
          placeholder={placeholder}
          onInput={onInput}
          value={value}
        />
      </div>
    </div>
  );
};
