import { Navbar } from '@/features/common/navbar/Navbar';
import { EditorPaneSkeleton } from '@/features/question/EditorPaneSkeleton';
import { QuestionPane } from '@/features/question/QuestionPane';
import { QuestionPaneSkeleton } from '@/features/question/QuestionPaneSkeleton';
import { fetch } from '@/utils/Fetch';
import { PublicQuestion } from '@codern/external';
import { Suspense, lazy } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';

const EditorPane = lazy(() => import('@/features/question/EditorPane'));

type QuestionPageProps = {
  workspaceId: string,
  questionId: string,
};

export const QuestionPage = ({
  workspaceId,
  questionId,
}: QuestionPageProps) => {
  const [question, setQuestion] = useState<PublicQuestion | null>(null);

  useEffect(() => {
    // TODO: error handling
    let timer: number;
    fetch
      .get(`/workspaces/${workspaceId}/questions/${questionId}`)
      .then((response) => {
        timer = setTimeout(() => { setQuestion(response.data) }, 100);
      })
      .catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-neutral-900 transition-theme">
      <Navbar />

      <main className="container w-full h-full flex flex-row space-x-6 p-6 overflow-hidden">
        <section className="w-6/12">
          {question
            ? (<QuestionPane
                workspaceId={workspaceId}
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
