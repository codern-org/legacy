import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  type: 'text' | 'number' | 'email' | 'password' | 'checkbox',
  name?: string,
  label?: string,
  placeholder?: string,
  icon?: ComponentChildren,
  className?: string,
  onInput?: (event: Event) => void,
  value?: string | number,
  autoComplete?: string,
  error?: string,
  register?: UseFormRegister<any>,
  pattern?: { value: RegExp, message: string },
  required?: boolean,
  min?: number,
  max?: number,
};

export const Input = ({
  type,
  name,
  label,
  placeholder,
  icon,
  className,
  onInput,
  value,
  autoComplete,
  error,
  register,
  pattern,
  required = false,
  min,
  max,
}: InputProps) => {
  if (type === 'checkbox') {
    return (
      <div className="flex flex-row group">
        <input
          type="checkbox"
          id={name}
          className="accent-black dark:accent-white hover:cursor-pointer"
        />
        <label htmlFor={name} className="ml-2 text-neutral-500 hover:cursor-pointer">
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className={classNames('flex flex-col space-y-2', className)}>
      {label && <label className="block text-neutral-500">{label}</label>}
      <div className={classNames(
        'w-full flex flex-row items-center text-black dark:text-white bg-primary border rounded-md focus-within:border transition-theme',
        error
          ? 'border-red-500 focus-within:border-red-600'
          : 'border-primary focus-within:border-black dark:focus-within:border-neutral-300',
      )}>
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
          autoComplete={autoComplete}
          min={min}
          max={max}
          {...((register && name) && register(name, { required, pattern }))}
        />
      </div>
      {error && (<span className="text-sm text-red-500">{error}</span>)}
    </div>
  );
};
