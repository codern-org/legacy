import { Button } from '@/features/common/Button';
import { Markdown } from '@/features/common/Makdown';
import { Text } from '@/features/common/Text';
import { SubmissionSection } from '@/features/question/SubmissionSection';
import { QuestionStatusBadge } from '@/features/workspace/QuestionStatusBadge';
import { mockSubmissions } from '@/store/mockup/SubmissionMockup';
import { Question } from '@/store/QuestionStore';
import { Submission } from '@/store/SubmissionStore';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';

type QuestionPaneProps = {
  creatorId: string,
  workspaceId: string,
  question: Question
};

export const QuestionPane = ({
  creatorId,
  workspaceId,
  question,
}: QuestionPaneProps) => {
  const [currentSection, setCurrentSection] = useState("problem");
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);

  // TOOD: real fetch
  useEffect(() => {
    setTimeout(() => {
      setSubmissions(mockSubmissions);
    }, 2000);
  }, []);

  return (
    <div className="h-full flex flex-col p-6 border border-primary rounded-lg">
      <div className="flex flex-row justify-between items-center mb-4 pb-4 border-b border-primary">
        <div className="flex flex-row items-center">
          <ChevronLeftIcon
            className="w-4 h-4 mr-1 text-black dark:text-white hover:cursor-pointer"
            onClick={() => route(`/workspace/${creatorId}/${workspaceId}`)}
          />
          <Text color="primary" className="mr-2">{question.title}</Text>
          <Text color="secondary" className="capitalize">({question.level})</Text>
        </div>

        <QuestionStatusBadge status={question.status} />
      </div>

      <div className="flex flex-row mb-8 space-x-2 pb-4 border-b border-primary">
        <Button color="secondary" size="sm" onClick={() => setCurrentSection("problem")} active={currentSection === "problem"}>Problem</Button>
        <Button color="secondary" size="sm" onClick={() => setCurrentSection("submission")} active={currentSection === "submission"}>Submissions</Button>
      </div>
      <div className="py-4 overflow-y-auto">
        {currentSection === "problem" && (<Markdown markdown={question.detail} />)}
        {currentSection === "submission" && (<SubmissionSection submissions={submissions} />)}
      </div>
    </div>
  );
};
