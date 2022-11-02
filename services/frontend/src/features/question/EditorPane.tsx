import { Button } from '@/features/common/Button';
import { Editor } from '@/features/question/Editor';
import { editorCodeAtom, editorSettingsAtom, isSupportedEditorLanguage } from '@/store/EditorStore';
import { defaultCodeByLanguage } from '@/store/mockup/EditorMockup';
import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';

export const EditorPane = () => {
  const [editorCodes, setEditorCodes] = useAtom(editorCodeAtom);
  const [editorSettings, setEditorSettings] = useAtom(editorSettingsAtom);

  const handleLanguageChange = (event: Event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;
    const language = event.target.value;
    if (!isSupportedEditorLanguage(language)) return;
    setEditorSettings({ ...editorSettings, language: language });
  };

  const handleResetCode = () => {
    const language = editorSettings.language;
    setEditorCodes({ ...editorCodes, [language]: defaultCodeByLanguage[language] });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex rounded-lg overflow-hidden border border-primary">
        <Editor />
      </div>

      <div className="flex flex-row justify-between space-x-2 mt-6">
        <div className="flex flex-row space-x-2">
          {/* TODO: setting */}
          <Button
            color="secondary"
            className="h-full"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </Button>

          <div className="relative group">
            <span className="hidden group-hover:block absolute left-1/2 bottom-0 w-fit px-2 py-1 text-sm text-neutral-300 whitespace-nowrap rounded-lg bg-neutral-700 transform -translate-y-12 -translate-x-1/2">
              Reset code
            </span>
            <Button
              color="secondary"
              className="h-full"
              onClick={handleResetCode}
            >
              <ArrowPathIcon className="w-5 h-5" />
            </Button>
          </div>

          <select
            className="w-32 pl-4 pr-8 text-sm text-black dark:text-white dark:bg-black border border-primary hover:border-primary-hover rounded-lg focus:outline-none"
            onInput={handleLanguageChange}
          >
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript (For testing only)</option>
          </select>
        </div>
        <Button className="px-8">Submit</Button>
      </div>
    </div>
  );
};
