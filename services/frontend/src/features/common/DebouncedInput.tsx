import { Input } from '@/features/common/Input';
import { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';

type DebouncedInputProps = {
  debounce: number,
  onChange: (value: string) => void,
  icon?: ComponentChildren,
  className?: string,
  placeholder?: string,
};

export const DebouncedInput = ({
  debounce,
  onChange,
  icon,
  className,
  placeholder,
}: DebouncedInputProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  const handleInputChange = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    setValue(event.target.value);
  };

  return (
    <Input
      type="text"
      icon={icon}
      className={className}
      placeholder={placeholder}
      onInput={handleInputChange}
    />
  );
};
