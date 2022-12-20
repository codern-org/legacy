import { SubmissionList } from '@/features/question/submission/SubmissionList';
import { SubmissionListSkeleton } from '@/features/question/submission/SubmissionListSkeleton';
import { fetch } from '@/utils/Fetch';
import { PublicSubmission } from '@codern/external';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

type SubmissionSectionProps = {
  workspaceId: number,
  questionId: number,
};

export const SubmissionSection = ({
  workspaceId,
  questionId,
}: SubmissionSectionProps) => {
  const [submissions, setSubmissions] = useState<PublicSubmission[] | null>(null);

  useEffect(() => {
    let timer: number;

    const getSubmission = () => {
      fetch
        .get(`/workspaces/${workspaceId}/questions/${questionId}/submissions`)
        .then((response) => {
          timer = setTimeout(() => setSubmissions(response.data), 100);
        })
        .catch(() => toast.error('Cannot retrieve submission data'));
    };

    getSubmission();
    // TODO: optimize
    const polling = setInterval(() => getSubmission(), 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(polling);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {(!submissions) && <SubmissionListSkeleton />}

      {(submissions) && submissions.map((submission, index) => (
        <SubmissionList
          key={submission.id}
          index={index}
          language={submission.language}
          result={submission.result}
          uploadedAt={submission.uploadedAt}
        />
      ))}
    </div>
  );
}
