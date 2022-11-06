import { Text } from '@/features/common/Text';
import { SubmissionStatusBadge } from '@/features/question/submission/SubmissionStatusBadge';
import { Submission } from '@/store/SubmissionStore';
import { classNames } from '@/utils/Classes';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

type SubmissionListProps = Omit<Submission, 'id'> & {
  index: number,
};

export const SubmissionList = ({
  index,
  date,
  language,
  testcases,
}: SubmissionListProps) => {
  const isPass = !testcases.some((testcase) => !testcase.pass);

  return (
    <div className="space-y-1">
      <Disclosure>
        {({ open }: { open: boolean }) => (
          <>
            <Disclosure.Button className="w-full flex flex-row justify-between items-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg">
              <div className="flex flex-row items-center space-x-4">
                <Text color="secondary">{index + 1}</Text>
                <div className="flex flex-col text-left">
                  <Text color="primary" className="text-sm">
                    Language: {language}
                  </Text>
                  <Text color="secondary" className="text-xs">
                    {date.toLocaleDateString('th-TH')}&nbsp;
                    {date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Text>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-4">
                <SubmissionStatusBadge pass={isPass} />
                <Text color="secondary">
                  <ChevronUpIcon className={classNames('w-5 h-5', !open && 'transform rotate-180')} />
                </Text>
              </div>
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition duration-100 ease-in"
              enterFrom="transform opacity-0 -translate-y-4"
              enterTo="transform opacity-100"
              leave="transition duration-75 ease-in"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0 -translate-y-4"
            >
              <Disclosure.Panel className="px-4 py-2 rounded-lg">
                {testcases.map((testcase, index) => (
                  <span className="flex flex-row space-x-2">
                    <Text color="secondary">
                      Case {index + 1}
                    </Text>
                    <Text color="secondary" className={classNames(
                      testcase.pass ? 'text-green-500' : 'text-red-500',
                    )}>
                      {testcase.pass ? 'Pass' : 'Error'}
                      {!testcase.pass && (
                        <> ({testcase.info})</>
                      )}
                    </Text>
                  </span>
                ))}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
