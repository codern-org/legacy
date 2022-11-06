import { getSystemTheme, selectedThemeAtom, themeAtom } from '@/stores/ThemeStore';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const [selectedTheme, setSelectedTheme] = useAtom(selectedThemeAtom);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    if ((theme === 'dark') || (theme === 'system' && getSystemTheme() === 'dark')) {
      document.documentElement.classList.add('dark');
      setSelectedTheme('dark');
    } else {
      setSelectedTheme('light');
    }
    // console.log(`Switch to ${theme === 'dark' ? '🌑' : '🌞'} theme!`);
  }, [theme]);

  return [theme, setTheme, selectedTheme] as const;
};
