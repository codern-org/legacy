import { Text } from '@/features/common/Text';
import { useTheme } from '@/store/ThemeStore';
import { classNames } from '@/utils/Classes';

type CodernLogoProps = {
  className?: string,
};

export const CodernLogo = ({
  className,
}: CodernLogoProps) => {
  const [theme, setTheme, selectedTheme] = useTheme();

  return (
    <span className={classNames('flex flex-row items-center', className)}>
      <img src={`/codern-${selectedTheme}.svg`} alt="Codern Logo" className="w-9 h-9"/>
      <Text className="text-lg font-bold">Codern</Text>
    </span>
  );
};
