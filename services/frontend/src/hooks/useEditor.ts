import { defaultLanguageData, EditorLanguage, editorRefAtom, editorSettingsAtom } from '@/stores/EditorStore';
import { monaco } from '@/utils/Monaco';
import { useAtom } from 'jotai';

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
    editor.setSelection(new monaco.Range(0, 0, 0, 0));
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
