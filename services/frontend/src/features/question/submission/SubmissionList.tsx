import { Spinner } from '@/features/common/Spinner';
import { Text } from '@/features/common/Text';
import { SubmissionStatusBadge } from '@/features/question/submission/SubmissionStatusBadge';
import { classNames } from '@/utils/Classes';
import { PublicLanguage, PublicSubmissionStatus } from '@codern/external';
import { Timestamp } from '@codern/shared';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const ERROR_INFO: { [key: string]: string } = {
  '2': 'Timeout',
  '3': 'Out of memory',
};

type SubmissionListProps = {
  index: number,
  language: PublicLanguage,
  result?: string,
  uploadedAt: number,
};

export const SubmissionList = ({
  index,
  language,
  result,
  uploadedAt,
}: SubmissionListProps) => {
  const status = (result)
    ? (Number.parseInt(result) === 0)
      ? PublicSubmissionStatus.PASS
      : PublicSubmissionStatus.ERROR
    : PublicSubmissionStatus.GRADING;

  return (
    <div className="space-y-1">
      <Disclosure>
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

              <div className="flex flex-row items-center space-x-4">
                <SubmissionStatusBadge status={status} />
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
                {result && [...result].map((result, index) => (
                  <span className="flex flex-row space-x-2 font-mono text-xs">
                    <Text color="secondary">Case {index + 1}</Text>
                    <span className={classNames(
                      (result === '0') ? 'text-green-500' : 'text-red-500',
                    )}>
                      {(result === '0') ? 'Pass' : 'Error'}&nbsp;
                      {(Number.parseInt(result) > 1) && (
                        <>({ERROR_INFO[result] || 'Error'})</>
                      )}
                    </span>
                  </span>
                ))}

                {!result && (
                  <div className="flex flex-row justify-center items-center space-x-2">
                    <Spinner className="animate-spin w-5 h-5 text-neutral-400" />
                    <Text color="secondary" className="animate-pulse">Grading...</Text>
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
