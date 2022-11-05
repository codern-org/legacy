import { defaultLanguageData, EditorLanguage, editorRefAtom, editorSettingsAtom } from '@/stores/EditorStore';
import { useAtom } from 'jotai';
import { Range } from 'monaco-editor';

export const useEditor = () => {
  const [settings, setSettings] = useAtom(editorSettingsAtom);
  const [editorRef] = useAtom(editorRefAtom);

  const resetCode = () => {
    if (!editorRef.monacoEditor) return;
    
    const editor = editorRef.monacoEditor;
    const language = settings.language;
    const languageData = defaultLanguageData[language];
    const model = editor.getModel();

    if (!model) return;

    editor.pushUndoStop();
    editor.executeEdits('reset', [{
      range: model.getFullModelRange(),
      text: languageData.code,
    }]);
    editor.setSelection(new Range(0, 0, 0, 0));
    editor.setPosition(languageData.position);
    editor.focus();
  };

  const changeLanguage = (language: EditorLanguage) => {
    setSettings({ ...settings, language: language });
  };

  return {
    resetCode,
    changeLanguage,
  };
};
