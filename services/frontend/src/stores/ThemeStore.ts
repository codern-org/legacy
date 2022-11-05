import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

type ThemeSettings = 'system' | 'light' | 'dark';
type SelectedThemeSettings = Omit<ThemeSettings, 'system'>;

export const getSystemTheme = (): ThemeSettings => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const themeAtom = atomWithStorage<ThemeSettings>('theme', getSystemTheme());
export const selectedThemeAtom = atom<SelectedThemeSettings>('light');
