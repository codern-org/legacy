import { Row } from '@/features/common/layout/Row';
import { useTheme } from '@/store/ThemeStore';

type CodernLogoProps = {
  className?: string,
};

export const CodernLogo = ({
  className,
}: CodernLogoProps) => {
  const [theme, setTheme, selectedTheme] = useTheme();

  return (
    <Row className={className} center="secondary">
      <img src={`/codern-${selectedTheme}.svg`} alt="Codern Logo" className="w-9 h-9"/>
      <p className="text-black dark:text-white text-lg font-bold">Codern</p>
    </Row>
  );
};
