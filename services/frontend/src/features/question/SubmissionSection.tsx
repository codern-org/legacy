import { Submission } from '@/store/SubmissionStore';
import { Disclosure } from '@headlessui/react';
import { Text } from '@/features/common/Text';
import { SubmissionSectionSkeleton } from '@/features/question/SubmissionSectionSkeleton';

type SubmissionSectionProps = {
  submissions: Submission[] | null,
}

export const SubmissionSection = ({
  submissions,
}: SubmissionSectionProps) => {
  if (!submissions) {
    return <SubmissionSectionSkeleton />;
  }
  return (
    <div className="flex flex-col">
      {(submissions) && submissions.map((submission) => (
        <div className="border-b" key={submission.id}>
          <Disclosure>
            <Disclosure.Button>
              <Text color="primary" className="">
                {submission.date.toString()}
                {submission.testcase.some((testcase) => !testcase)
                  ? "Incorrect"
                  : "Correct"
                }
              </Text>
            </Disclosure.Button>
            <Disclosure.Panel>
              {submission.testcase.map((testcase, index) => (
                <Text color="primary" className="" key={index}>
                  Testcase {index + 1}
                  {testcase
                    ? "Correct"
                    : "Incorrect"
                  }
                </Text>
              ))}
            </Disclosure.Panel>
          </Disclosure>
        </div>
      ))}
    </div>
  );
}
