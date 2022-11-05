import { Monaco, monaco, MonacoEditor } from '@/utils/Monaco';
import { atom } from 'jotai';

export const defaultLanguageData = {
  'c': {
    code: `#include <stdio.h>\n\nint main() {\n\t\n\treturn 0;\n}\n`,
    position: new monaco.Position(4, 4),
  },
  'cpp': {
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n\t\n\treturn 0;\n}\n`,
    position: new monaco.Position(5, 4),
  },
};

const editorLanguages = ['c', 'cpp'] as const;
export type EditorLanguage = typeof editorLanguages[number];
type CodeByLanguage = Record<EditorLanguage, string>;

type EditorSettings = {
  isLoaded: 'unload' | 'loading' | 'loaded',
  language: EditorLanguage,
};

export const isSupportedEditorLanguage = (
  language: string,
): language is EditorLanguage => {
  return editorLanguages.includes(language as EditorLanguage);
};

export const editorCodeAtom = atom<CodeByLanguage>({
  'c': defaultLanguageData['c'].code,
  'cpp': defaultLanguageData['cpp'].code,
});

export const editorSettingsAtom = atom<EditorSettings>({
  isLoaded: 'unload',
  language: 'c',
});

type EditorRef = {
  monacoEditor: MonacoEditor | null,
  monaco: Monaco | null,
};

export const editorRefAtom = atom<EditorRef>({
  monacoEditor: null,
  monaco: null,
});
