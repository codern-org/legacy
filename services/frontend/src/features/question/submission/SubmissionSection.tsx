import { SubmissionList } from '@/features/question/submission/SubmissionList';
import { SubmissionListSkeleton } from '@/features/question/submission/SubmissionListSkeleton';
import { mockSubmissions } from '@/stores/mockup/SubmissionMockup';
import { Submission } from '@/stores/SubmissionStore';
import { useEffect, useState } from 'preact/hooks';

export const SubmissionSection = () => {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);

  // TODO: real fetch
  useEffect(() => {
    setTimeout(() => {
      setSubmissions(mockSubmissions);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {(!submissions) && <SubmissionListSkeleton />}

      {(submissions) && submissions.map((submission, index) => (
        <SubmissionList
          key={submission.id}
          index={index}
          date={submission.date}
          language={submission.language}
          testcases={submission.testcases}
        />
      ))}
    </div>
  );
}
