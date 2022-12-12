import { SubmissionList } from '@/features/question/submission/SubmissionList';
import { SubmissionListSkeleton } from '@/features/question/submission/SubmissionListSkeleton';
import { fetch } from '@/utils/Fetch';
import { PublicSubmission } from '@codern/external';
import { useEffect, useState } from 'preact/hooks';

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
    // TODO: error handling
    let timer: number;
    fetch
      .get(`/workspaces/${workspaceId}/questions/${questionId}/submissions`)
      .then((response) => {
        timer = setTimeout(() => setSubmissions(response.data), 100);
      })
      .catch(() => {});
    return () => clearTimeout(timer);
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
