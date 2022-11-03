import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useEffect } from 'preact/hooks';

type ThemeSettings = 'system' | 'light' | 'dark';
type SelectedThemeSettings = Omit<ThemeSettings, 'system'>;

const getSystemTheme = (): ThemeSettings => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeAtom = atomWithStorage<ThemeSettings>('theme', getSystemTheme());
const selectedThemeAtom = atom<SelectedThemeSettings>('light');

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
