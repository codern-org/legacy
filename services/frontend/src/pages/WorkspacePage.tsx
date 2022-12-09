import { Navbar } from '@/features/common/navbar/Navbar';
import { QuestionTable } from '@/features/workspace/QuestionTable';
import { QuestionTableSkeleton } from '@/features/workspace/skeleton/QuestionTableSkeleton';
import { WorkspaceTopPanel } from '@/features/workspace/WorkspaceTopPanel';
import { WorkspaceTopPanelSkeleton } from '@/features/workspace/skeleton/WorkspaceTopPanelSkeleton';
import { fetch } from '@/utils/Fetch';
import { PublicWorkspace } from '@codern/external';
import { useEffect, useState } from 'preact/hooks';
import { useAtom } from 'jotai';
import { questionsAtom } from '@/stores/QuestionStore';

type WorkspacePageProps = {
  workspaceId: string,
};

export const WorkspacePage = ({
  workspaceId,
}: WorkspacePageProps) => {
  const [workspace, setWorkspace] = useState<PublicWorkspace | null>(null);
  const [questions, setQuestions] = useAtom(questionsAtom);

  useEffect(() => {
    // TODO: error handling
    fetch
      .get(`/workspaces/${workspaceId}`)
      .then((response) => setWorkspace(response.data))
      .catch(() => {});

    fetch
      .get(`/workspaces/${workspaceId}/questions`)
      .then((response) => setQuestions(response.data))
      .catch(() => {});
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
