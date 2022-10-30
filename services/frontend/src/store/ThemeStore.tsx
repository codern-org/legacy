import { atom, useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';

export type ThemeSettings = 'system' | 'light' | 'dark';

const themeValueAtom = atom<ThemeSettings>('light');

export const themeAtom = atom<ThemeSettings, ThemeSettings>(
  (get) => get(themeValueAtom),
  (get, set, theme) => {
    if (theme === get(themeValueAtom)) return;
    set(themeValueAtom, setDocumentTheme(theme));
  },
);

export const useInitTheme = () => {
  const [_, setTheme] = useAtom(themeAtom);
  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme');
    const validTheme = ['system', 'light', 'dark'].includes(themeFromLocalStorage || '')
      ? themeFromLocalStorage as ThemeSettings
      : 'system';
    setTheme(validTheme);
  }, []);
};

export const setDocumentTheme = (theme: ThemeSettings): ThemeSettings => {
  if (theme === 'system') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', theme);
  }

  const themeFromLocalStorage = localStorage.getItem('theme');
  const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let selectedTheme: ThemeSettings = 'light';

  if (themeFromLocalStorage === 'dark' || (!themeFromLocalStorage && isSystemDarkMode)) {
    document.documentElement.classList.add('dark')
    selectedTheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark')
  }

  localStorage.setItem('theme', selectedTheme);

  if (theme !== 'system') {
    console.log(`Switch to ${theme === 'dark' ? '🌑' : '🌞'} theme!`);
  } else {
    console.log(`Switch to ${isSystemDarkMode ? '🌑' : '🌞'} (system) theme!`);
  }

  return selectedTheme;
};
