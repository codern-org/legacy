import { Copyright } from '@/features/common/Copyright';
import { Navbar } from '@/features/common/navbar/Navbar';
import { EditorPaneSkeleton } from '@/features/question/EditorPaneSkeleton';
import { QuestionPane } from '@/features/question/QuestionPane';
import { QuestionPaneSkeleton } from '@/features/question/QuestionPaneSkeleton';
import { fetch } from '@/utils/Fetch';
import { PublicQuestion } from '@codern/external';
import { Suspense, lazy } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

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
    let timer: number;
    fetch
      .get(`/workspaces/${workspaceId}/questions/${questionId}`)
      .then((response) => {
        timer = setTimeout(() => { setQuestion(response.data) }, 100);
      })
      .catch(() => toast.error('Cannot retrieve question data'));
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 transition-theme">
      <Navbar />

      <main className="container w-full h-full flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 p-6 overflow-hidden">
        <section className="w-full lg:w-6/12 h-[75vh] lg:h-full">
          {question
            ? (<QuestionPane
              workspaceId={workspaceId}
              question={question}
            />)
            : (<QuestionPaneSkeleton workspaceId={workspaceId} />)
          }
        </section>
        <section className="w-full lg:w-6/12 h-[75vh] lg:h-full">
          <Suspense fallback={<EditorPaneSkeleton />}>
            <EditorPane
              workspaceId={workspaceId}
              questionId={questionId}
            />
          </Suspense>
        </section>
      </main>

      <footer className="w-full py-2 text-center border-t border-primary">
        <Copyright />
      </footer>
    </div>
  );
};
