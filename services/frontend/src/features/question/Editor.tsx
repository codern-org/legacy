import { defaultLanguageData, editorCodeAtom, editorRefAtom, editorSettingsAtom, MonacoEditor, MonacoEditorOptions } from '@/stores/EditorStore';
import MonacoEditorComponent, { Monaco, OnChange } from '@monaco-editor/react';
import { useAtom } from 'jotai';
import { useEffect, useReducer } from 'preact/hooks';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { classNames } from '@/utils/Classes';
import { useTheme } from '@/hooks/useTheme';

const options: MonacoEditorOptions = {
  automaticLayout: true,

  // Quality of life
  mouseWheelZoom: true,

  // Decoration
  fontFamily: "'Jetbrains Mono', Menlo, Monaco, 'Courier New', monospace",

  minimap: { enabled: false },
  cursorSmoothCaretAnimation: true,
  smoothScrolling: true,
};

export const Editor = () => {
  const forceRender = useReducer(() => ({}), {})[1] as () => void;

  const [, , selectedTheme] = useTheme();
  const [settings, setSettings] = useAtom(editorSettingsAtom);
  const [codes, setCodes] = useAtom(editorCodeAtom);
  const [editorRef, setEditorRef] = useAtom(editorRefAtom);

  // Sync theme after monaco instance initiated
  useEffect(() => {
    if (settings.isLoaded === 'unload') return;
    if (!editorRef.monaco) return; // For hot reloading error

    const monaco = editorRef.monaco;
    monaco.editor.setTheme('vs-' + selectedTheme);

    // Disable editor overlay when monaco theme sync with web theme
    if (settings.isLoaded === 'loading') {
      setSettings({ ...settings, isLoaded: 'loaded' });
    }
  }, [settings.isLoaded, selectedTheme]);

  // Update monaco language model when settings changes
  useEffect(() => {
    if (settings.isLoaded !== 'loaded') return;

    const monaco = editorRef.monaco;
    const editor = editorRef.monacoEditor;
    if (!monaco || !editor) return;

    const currentModel = monaco.editor.getModel(Uri.file('/main'))!;
    const previousLanguage = currentModel.getLanguageId();
    const newLanguage = settings.language;

    setCodes({ ...codes, [previousLanguage]: currentModel.getValue() });

    monaco.editor.setModelLanguage(currentModel, newLanguage);
    currentModel.setValue(codes[newLanguage]);

    editor.setPosition(defaultLanguageData[newLanguage].position);
    editor.focus();
  }, [settings.language]);

  const handleCodeChange: OnChange = (value) => {
    // setCodes({ ...codes, [settings.language]: value });
    // TODO: debounce auto save
  };

  // Initialize monaco and set the reference to retrieve editor/monaco instance later
  // Set `isLoaded` in editor setting atom to `loading` for creating side-effect to theme useEffect
  // before showing editor to the user (anti-flicker)
  const handleEditorDidMount = (editor: MonacoEditor, monaco: Monaco) => {
    setEditorRef({ monacoEditor: editor, monaco: monaco });

    const defaultLanguage = settings.language;
    const defaultCode = codes[defaultLanguage];
    const defaultModel = monaco.editor.createModel(defaultCode, defaultLanguage, Uri.file('/main'));

    editor.setModel(defaultModel);
    editor.setPosition(defaultLanguageData[defaultLanguage].position);
    editor.focus();

    setSettings({ ...settings, isLoaded: 'loading' });
    forceRender();
  };

  return (
    <div className="w-full h-full rounded-lg border border-primary overflow-hidden">
      <div className="relative w-full h-full">
        <span className={classNames(
          "z-10 absolute top-0 w-full h-full bg-white dark:bg-neutral-900 transition-theme",
          (settings.isLoaded === 'loaded') && 'invisible',
        )}>
          <MojiBunMascot className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </span>

        <MonacoEditorComponent
          options={options}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
        />
      </div>
    </div>
  );
};
