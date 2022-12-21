import { useSocket } from '@/contexts/SocketContext';
import { SubmissionList } from '@/features/question/submission/SubmissionList';
import { SubmissionListSkeleton } from '@/features/question/submission/SubmissionListSkeleton';
import { lastSubmissionIdAtom, submissionsAtom } from '@/stores/PaneStore';
import { fetch } from '@/utils/Fetch';
import { PublicSubmission } from '@codern/external';
import { useAtom } from 'jotai';
import { useEffect } from 'preact/hooks';
import { toast } from 'react-toastify';

type SubmissionSectionProps = {
  workspaceId: number,
  questionId: number,
};

export const SubmissionSection = ({
  workspaceId,
  questionId,
}: SubmissionSectionProps) => {
  const [submissions, setSubmissions] = useAtom(submissionsAtom);
  const [lastSubmissionId, setLastSubmissionId] = useAtom(lastSubmissionIdAtom);
  const socket = useSocket();

  useEffect(() => {
    let timer: number;

    socket.on('submission', (submission: PublicSubmission) => {
      setSubmissions((submissions) => {
        if (!submissions) return null;
        // Update specific submission with mutation
        const updatedSubmission = submissions
          .filter((submission) => submission.id === submission.id)[0];
        updatedSubmission.result = submission.result;
        return submissions.slice();
      });
    });

    fetch
      .get(`/workspaces/${workspaceId}/questions/${questionId}/submissions`)
      .then((response) => {
        timer = setTimeout(() => setSubmissions(response.data), 100);
      })
      .catch(() => toast.error('Cannot retrieve submission data'));

    return () => {
      clearTimeout(timer);
      socket.off('submission');
      setSubmissions(null);
      setLastSubmissionId(null);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {(!submissions) && <SubmissionListSkeleton />}

      {(submissions) && submissions
        .map((submission, index, submissions) => (
          <SubmissionList
            key={submission.id}
            id={submission.id}
            open={lastSubmissionId === submission.id}
            index={submissions.length - index}
            language={submission.language}
            result={submission.result}
            uploadedAt={submission.uploadedAt}
          />
        )
      )}
    </div>
  );
}
