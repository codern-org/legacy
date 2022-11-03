import { editorCodeAtom, editorSettingsAtom } from '@/store/EditorStore';
import { useTheme } from '@/store/ThemeStore';
import MonacoEditorComponent from '@monaco-editor/react';
import { useAtom } from 'jotai';
import { useEffect, useReducer, useRef, useState } from 'preact/hooks';
import monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { classNames } from '@/utils/Classes';

type Monaco = typeof monaco;
type MonacoEditor = monaco.editor.IStandaloneCodeEditor;
type MonacoEditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

const options: MonacoEditorOptions = {
  automaticLayout: true,

  fontFamily: 'Jetbrains Mono',

  minimap: { enabled: false },
  cursorSmoothCaretAnimation: true,
  smoothScrolling: true,
};

export const Editor = () => {
  const forceRender = useReducer(() => ({}), {})[1] as () => void;

  const editorRef = useRef<MonacoEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const [, , selectedTheme] = useTheme();
  const editorTheme = (selectedTheme === 'dark') ? 'vs-dark' : 'vs';

  const [isEditorLoaded, setIsEditorLoaded] = useState<boolean>(false);
  const [settings] = useAtom(editorSettingsAtom);
  const [codes, setCodes] = useAtom(editorCodeAtom);

  // Sync theme after monaco instance initiated
  useEffect(() => {
    if (!monacoRef.current) return;
    monacoRef.current.editor.setTheme('vs-' + selectedTheme);
  
    if (isEditorLoaded) return;
    const currentEditorTheme = ((editorRef.current as any)?._themeService._theme.id);
    setIsEditorLoaded(currentEditorTheme === editorTheme);
  }, [monacoRef.current, selectedTheme]);

  // Update monaco language model when settings changes
  // TODO: optimize model creation (reuse)
  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const code = editor.getValue();
    const previousLanguage = editor.getModel()!.getLanguageId();
    const newLanguage = settings.language;

    setCodes({ ...codes, [previousLanguage]: code });

    const newLanguageModel = monaco.editor.createModel(codes[newLanguage], newLanguage);
    editor.setModel(newLanguageModel);
  }, [settings.language]);

  useEffect(() => {
    if (!(editorRef.current)) return;
    console.log(settings.language);
    editorRef.current.setValue(codes[settings.language]);
  }, [codes]);

  const handleEditorDidMount = (editor: MonacoEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    forceRender();
  };

  return (
    <div className="w-full h-full rounded-lg border border-primary overflow-hidden">
      <div className="relative w-full h-full">
        <span className={classNames(
          "z-10 absolute top-0 w-full h-full bg-white dark:bg-neutral-900 transition-theme",
          isEditorLoaded ? 'opacity-0 -z-50' : 'z-50',
        )}>
          <MojiBunMascot className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </span>

        <MonacoEditorComponent
          options={options}
          defaultLanguage={settings.language}
          defaultValue={codes[settings.language]}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};
