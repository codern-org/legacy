import { Text } from '@/features/common/Text';
import { useTheme } from '@/hooks/useTheme';
import { classNames } from '@/utils/Classes';
import { route } from 'preact-router';

type CodernLogoProps = {
  className?: string,
};

export const CodernLogo = ({
  className,
}: CodernLogoProps) => {
  const [theme, setTheme, selectedTheme] = useTheme();

  return (
    <span
      className={classNames('flex flex-row items-center hover:cursor-pointer', className)}
      onClick={() => route('/dashboard')}
    >
      <img src={`/codern-${selectedTheme}.svg`} alt="Codern Logo" className="w-9 h-9"/>
      <Text className="text-lg font-bold">Codern</Text>
    </span>
  );
};
