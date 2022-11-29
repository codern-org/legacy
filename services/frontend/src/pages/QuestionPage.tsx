import { Navbar } from '@/features/common/navbar/Navbar';
import { EditorPaneSkeleton } from '@/features/question/EditorPaneSkeleton';
import { QuestionPane } from '@/features/question/QuestionPane';
import { QuestionPaneSkeleton } from '@/features/question/QuestionPaneSkeleton';
import { mockQuestions } from '@/stores/mockup/QuestionMockup';
import { Question } from '@/stores/QuestionStore';
import { Suspense, lazy } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

const EditorPane = lazy(() => import('@/features/question/EditorPane'));

type QuestionPageProps = {
  creatorId?: string,
  workspaceId?: string,
  questionId?: string,
};

export const QuestionPage = ({
  creatorId,
  workspaceId,
  questionId,
}: QuestionPageProps) => {
  const [question, setQuestion] = useState<Question | null>(null);

  // TODO: real fetch
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
            : (<QuestionPaneSkeleton />)
          }
        </section>
        <section className="w-6/12">
          <Suspense fallback={<EditorPaneSkeleton />}>
            <EditorPane />
          </Suspense>
        </section>
      </main>
    </div>
  );
};
