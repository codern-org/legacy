import { Navbar } from '@/features/common/navbar/Navbar';
import { QuestionTable } from '@/features/workspace/QuestionTable';
import { QuestionTableSkeleton } from '@/features/workspace/skeleton/QuestionTableSkeleton';
import { WorkspaceTopPanel } from '@/features/workspace/WorkspaceTopPanel';
import { WorkspaceTopPanelSkeleton } from '@/features/workspace/skeleton/WorkspaceTopPanelSkeleton';
import { fetch } from '@/utils/Fetch';
import { useEffect } from 'preact/hooks';
import { useAtom } from 'jotai';
import { questionsAtom } from '@/stores/QuestionStore';
import { workspaceAtom } from '@/stores/WorkspaceStore';

type WorkspacePageProps = {
  workspaceId: string,
};

export const WorkspacePage = ({
  workspaceId,
}: WorkspacePageProps) => {
  const [workspace, setWorkspace] = useAtom(workspaceAtom);
  const [questions, setQuestions] = useAtom(questionsAtom);

  useEffect(() => {
    // TODO: error handling
    let workspaceTimer: number;
    let questionsTimer: number;

    fetch
      .get(`/workspaces/${workspaceId}`)
      .then((response) => {
        workspaceTimer = setTimeout(() => setWorkspace(response.data), 500);
      })
      .catch(() => {});

    fetch
      .get(`/workspaces/${workspaceId}/questions`)
      .then((response) => {
        questionsTimer = setTimeout(() => setQuestions(response.data), 500);
      })
      .catch(() => {});

    return () => {
      clearTimeout(workspaceTimer);
      clearTimeout(questionsTimer);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-black transition-theme">
      <Navbar />

      <main className="container w-full h-full flex flex-col p-6">
        {workspace
          ? (<WorkspaceTopPanel
              name={workspace.name}
              ownerName={workspace.ownerName}
              profilePath={workspace.profilePath}
            />)
          : (<WorkspaceTopPanelSkeleton />)
        }

        {questions
          ? (<QuestionTable questions={questions} />)
          : (<QuestionTableSkeleton />)
        }
      </main>
    </div>
  );
};
