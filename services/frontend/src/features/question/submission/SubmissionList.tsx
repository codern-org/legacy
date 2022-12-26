import { Text } from '@/features/common/Text';
import { SubmissionResult } from '@/features/question/submission/SubmissionResult';
import { SubmissionStatusBadge } from '@/features/question/submission/SubmissionStatusBadge';
import { classNames } from '@/utils/Classes';
import { PublicLanguage, PublicSubmissionStatus } from '@codern/external';
import { Timestamp } from '@codern/shared';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

type SubmissionListProps = {
  index: number,
  id: number,
  open?: boolean,
  language: PublicLanguage,
  status: PublicSubmissionStatus,
  result?: string,
  uploadedAt: number,
};

export const SubmissionList = ({
  index,
  id,
  open = false,
  language,
  status,
  result,
  uploadedAt,
}: SubmissionListProps) => {
  return (
    <div className="space-y-1">
      <Disclosure defaultOpen={open}>
        {({ open }: { open: boolean }) => (
          <>
            <Disclosure.Button className="w-full flex flex-row justify-between items-center px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg">
              <div className="flex flex-row items-center space-x-4">
                <Text color="secondary">{index}</Text>
                <div className="flex flex-col text-left">
                  <Text color="primary" className="text-sm">
                    Language: {language}
                  </Text>
                  <Text color="secondary" className="text-xs">
                    {Timestamp.from(uploadedAt).toLocaleDateString('th-TH')}&nbsp;
                    {Timestamp.from(uploadedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </Text>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-2 lg:space-x-4">
                <SubmissionStatusBadge
                  status={status}
                  result={result}
                />
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
                <SubmissionResult
                  status={status}
                  result={result}
                />

                <span className="text-neutral-300 dark:text-neutral-500 text-xs mt-2">Submission id: {id}</span>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
