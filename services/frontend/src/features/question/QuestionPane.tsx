import { Button } from '@/features/common/Button';
import { Markdown } from '@/features/common/Makdown';
import { Text } from '@/features/common/Text';
import { SubmissionSection } from '@/features/question/submission/SubmissionSection';
import { QuestionStatusBadge } from '@/features/workspace/QuestionStatusBadge';
import { PublicQuestion } from '@codern/external';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

const sections = ['problem', 'submission'] as const;
export type QuestionPaneSection = typeof sections[number];

type QuestionPaneProps = {
  creatorId: string,
  workspaceId: string,
  question: PublicQuestion,
};

export const QuestionPane = ({
  creatorId,
  workspaceId,
  question,
}: QuestionPaneProps) => {
  const [currentSection, setCurrentSection] = useState<QuestionPaneSection>('problem');

  return (
    <div className="h-full flex flex-col p-6 border border-primary rounded-lg">
      <div className="flex flex-row justify-between items-center mb-4 pb-4 border-b border-primary">
        <div className="flex flex-row items-center">
          <ChevronLeftIcon
            className="w-4 h-4 mr-1 text-black dark:text-white hover:cursor-pointer"
            onClick={() => route(`/workspace/${creatorId}/${workspaceId}`)}
          />
          <Text color="primary" className="mr-2">{question.name}</Text>
          <Text color="secondary" className="capitalize">({question.level})</Text>
        </div>

        <QuestionStatusBadge status={question.status} />
      </div>

      <div className="flex flex-row mb-8 space-x-2 pb-4 border-b border-primary">
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
      <div className="py-4 overflow-y-auto">
        {currentSection === 'problem' && (<Markdown markdown={question.detailPath} />)}
        {currentSection === 'submission' && (<SubmissionSection />)}
      </div>
    </div>
  );
};
