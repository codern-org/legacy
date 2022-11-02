import { defaultCodeByLanguage } from '@/store/mockup/EditorMockup';
import { atom } from 'jotai';

const editorLanguages = ['c', 'cpp', 'javascript'] as const;
type EditorLanguage = typeof editorLanguages[number];
type CodeByLanguage = Record<EditorLanguage, string>;

type EditorSettings = {
  language: EditorLanguage,
};

export const isSupportedEditorLanguage = (
  language: string,
): language is EditorLanguage => {
  return editorLanguages.includes(language as EditorLanguage);
};

export const editorCodeAtom = atom<CodeByLanguage>({
  'c': defaultCodeByLanguage['c'],
  'cpp': defaultCodeByLanguage['cpp'],
  'javascript': defaultCodeByLanguage['javascript'],
});

export const editorSettingsAtom = atom<EditorSettings>({
  language: 'c',
});
