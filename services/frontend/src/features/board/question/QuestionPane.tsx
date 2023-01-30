import { Button } from '@/features/common/Button';
import { Markdown } from '@/features/common/Makdown';
import { Text } from '@/features/common/Text';
import { SubmissionSection } from '@/features/board/submission/SubmissionSection';
import { QuestionStatusBadge } from '@/features/workspace/QuestionStatusBadge';
import { questionPaneAtom } from '@/stores/PaneStore';
import { numberWithCommas } from '@/utils/Common';
import { fetch } from '@/utils/Fetch';
import { PublicQuestion } from '@codern/external';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

const sections = ['problem', 'submission'] as const;
export type QuestionPaneSection = typeof sections[number];

type QuestionPaneProps = {
  workspaceId: string,
  question: PublicQuestion,
};

export const QuestionPane = ({
  workspaceId,
  question,
}: QuestionPaneProps) => {
  const [currentSection, setCurrentSection] = useAtom(questionPaneAtom);
  const [questionMarkdown, setQuestionMarkdown] = useState<string | null>(null);

  useEffect(() => {
    setCurrentSection('problem');

    fetch
      .get(question.detailPath)
      .then((response) => setQuestionMarkdown(response.data))
      .catch(() => toast.error('Cannot retrieve question detail'))

    return () => setCurrentSection('problem');
  }, [question.detailPath]);

  return (
    <div className="h-full flex flex-col p-6 border border-primary rounded-lg bg-white dark:bg-neutral-900">
      <div className="flex flex-row justify-between items-center mb-3 pb-3 border-b border-primary">
        <div className="flex flex-row items-center">
          <ChevronLeftIcon
            className="w-7 h-7 mr-1 p-1 text-black dark:text-white hover:text-neutral-400 dark:hover:text-neutral-400 hover:cursor-pointer"
            onClick={() => route(`/workspace/${workspaceId}`)}
          />

          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Text color="primary" className="mr-1">{question.name}</Text>
              <Text color="secondary" className="text-sm capitalize">({question.level})</Text>
            </div>
            <div className="flex flex-row space-x-2">
              <Text color="secondary" className="text-sm">Memory: {numberWithCommas(question.memoryLimit)} MB</Text>
              <Text color="secondary" className="text-sm">Time: {numberWithCommas(question.timeLimit)} ms</Text>
            </div>
          </div>
        </div>

        <QuestionStatusBadge status={question.status} className="mb-2" />
      </div>

      <div className="flex flex-row mb-2 space-x-2 pb-3 border-b border-primary">
        {sections.map((section) => (
          <Button
            key={section}
            color="secondary"
            size="sm"
            onClick={() => setCurrentSection(section)}
            active={currentSection === section}
            className="capitalize"
          >
            {section}
          </Button>
        ))}
      </div>

      <div className="relative py-4 overflow-y-auto">
        {((currentSection === 'problem') && (questionMarkdown))
          && (<Markdown string={questionMarkdown} />)
        }

        {currentSection === 'submission' && (
          <SubmissionSection
            workspaceId={Number.parseInt(workspaceId)}
            questionId={question.id}
          />
        )}
      </div>
    </div>
  );
};
