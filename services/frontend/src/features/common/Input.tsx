import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Classes';
import { ComponentChildren } from 'preact';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
  type: 'text' | 'email' | 'password' | 'checkbox',
  name?: string,
  label?: string,
  placeholder?: string,
  icon?: ComponentChildren,
  className?: string,
  onInput?: (event: Event) => void,
  value?: string,
  autoComplete?: string,
  error?: string,
  register?: UseFormRegister<any>,
  pattern?: { value: RegExp, message: string },
  required?: boolean,
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
          {...((register && name) && register(name, { required, pattern }))}
        />
      </div>
      {error && (<span className="text-sm text-red-500">{error}</span>)}
    </div>
  );
};
