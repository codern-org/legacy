import { Button } from '@/features/common/Button';
import { Editor } from '@/features/question/Editor';
import { useEditor } from '@/hooks/useEditor';
import { isSupportedEditorLanguage } from '@/stores/EditorStore';
import { fetch } from '@/utils/Fetch';
import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useState } from 'preact/hooks';
import { toast } from 'react-toastify';

type EditorPaneProps = {
  workspaceId: string,
  questionId: string,
};

const EditorPane = ({
  workspaceId,
  questionId,
}: EditorPaneProps) => {
  const { resetCode, changeLanguage, settings, getCode } = useEditor();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLanguageChange = (event: Event) => {
    if (!(event.target instanceof HTMLSelectElement)) return;
    const language = event.target.value;
    if (!isSupportedEditorLanguage(language)) return;
    changeLanguage(language);
  };

  const handleResetCode = () => {
    resetCode();
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);

    const language = settings.language;
    const code = getCode();
    if (!code) return;

    const formData = new FormData();
    formData.append('file', new Blob([code]), 'src');
  
    fetch
      .post(`/workspaces/${workspaceId}/questions/${questionId}/grade/${language}`, formData)
      .then(() => {})
      .catch(() => toast.error('Cannot submit your sourcecode'))
      .finally(() => setTimeout(() => setIsSubmitting(false), 1000));
  };

  return (
    <div className="h-full flex flex-col">
      <Editor questionId={questionId} freeze={isSubmitting} />

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
          </select>
        </div>

        <Button
          className="px-8"
          onClick={handleSubmitCode}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default EditorPane;
