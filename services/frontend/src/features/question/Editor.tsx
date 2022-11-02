import { editorCodeAtom, editorSettingsAtom } from '@/store/EditorStore';
import { useTheme } from '@/store/ThemeStore';
import MonacoEditorComponent from '@monaco-editor/react';
import { useAtom } from 'jotai';
import { useEffect, useReducer, useRef } from 'preact/hooks';
import monaco from 'monaco-editor/esm/vs/editor/editor.api';

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

  const [,, selectedTheme] = useTheme();
  const [settings] = useAtom(editorSettingsAtom);
  const [codes, setCodes] = useAtom(editorCodeAtom);

  const editorRef = useRef<MonacoEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);

  // Sync theme after monaco instance initiated
  useEffect(() => {
    if (!monacoRef.current) return;
    monacoRef.current.editor.setTheme('vs-' + selectedTheme);
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

    const newLanguageModel = monaco.editor.createModel(codes[newLanguage]);
    monaco.editor.setModelLanguage(newLanguageModel, newLanguage);
    editor.setModel(newLanguageModel);
  }, [settings.language]);

  // TODO: not recently selected theme cause from aync state
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.setTheme('vs-' + selectedTheme);
  };

  const handleEditorDidMount = (editor: MonacoEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    forceRender(); // Sync theme TODO: optimize
  };

  return (
    <MonacoEditorComponent
      options={options}
      defaultLanguage={settings.language}
      defaultValue={codes[settings.language]}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
};
