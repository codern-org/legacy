import { Row } from '@/features/common/layout/Row';
import { themeAtom } from '@/store/ThemeStore';
import { useAtom } from 'jotai';

type CodernLogoProps = {
  className?: string,
};

export const CodernLogo = ({
  className,
}: CodernLogoProps) => {
  const [theme] = useAtom(themeAtom);

  return (
    <Row className={className} center="secondary">
      <img src={`codern-${theme}.svg`} alt="Codern Logo" className="w-9 h-9"/>
      <p className="text-black dark:text-white text-lg font-bold">Codern</p>
    </Row>
  );
};
