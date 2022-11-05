import { Navbar } from '@/features/common/navbar/Navbar';
import EditorPane from '@/features/question/EditorPane';
import { QuestionPane } from '@/features/question/QuestionPane';
import { QuestionPangeSkeleton } from '@/features/question/QuestionPaneSkeleton';
import { mockQuestions } from '@/stores/mockup/QuestionMockup';
import { Question } from '@/stores/QuestionStore';
import { useEffect, useState } from 'preact/hooks';

type QuestionPageProps = {
  path: string,
  creatorId?: string,
  workspaceId?: string,
  questionId?: string,
};

const QuestionPage = ({
  path,
  creatorId,
  workspaceId,
  questionId,
}: QuestionPageProps) => {
  const [question, setQuestion] = useState<Question | null>(null);

  // TOOD: real fetch
  useEffect(() => {
    if (!questionId) return;
    setTimeout(() => {
      setQuestion(mockQuestions.filter((question) => question.id === Number.parseInt(questionId))[0]);
    }, 1000);
  }, [questionId]);

  return (
    <div className="h-screen flex flex-col dark:bg-neutral-900 transition-theme">
      <Navbar />

      <main className="container w-full h-full flex flex-row space-x-6 p-6 overflow-hidden">
        <section className="w-6/12">
          {question
            ? (<QuestionPane
                creatorId={creatorId!}
                workspaceId={workspaceId!}
                question={question}
              />)
            : (<QuestionPangeSkeleton />)
          }
        </section>
        <section className="w-6/12">
          <EditorPane />
        </section>
      </main>
    </div>
  );
};

export default QuestionPage;
