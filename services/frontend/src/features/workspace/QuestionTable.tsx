import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { QuestionTableList } from '@/features/workspace/QuestionTableList';
import { PublicQuestion } from '@codern/external';
import { MagnifyingGlassIcon, ArrowSmallDownIcon } from '@heroicons/react/24/outline';

type QuestionTableProps = {
  questions: PublicQuestion[], 
};

export const QuestionTable = ({
  questions,
}: QuestionTableProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center space-x-4 mb-6">
        <div className="flex flex-row items-center space-x-2">
          <Text color="primary" className="text-2xl font-semibold">Question</Text>
          <Text color="secondary">({questions.length})</Text>
        </div>

        <Input
          type="text"
          icon={<MagnifyingGlassIcon />}
          placeholder="Search by name, description, status"
          className="w-96"
        />
      </div>

      <table className="table-auto text-left">
        <thead className="bg-neutral-100 dark:bg-neutral-900 outline outline-1 outline-neutral-300 dark:outline-neutral-700 rounded-md transition-all ease-in duration-200">
          <tr>
            <th className="flex flex-row items-center space-x-2 px-2 md:px-4 py-2 font-normal text-neutral-400">
              <span>#</span>
              <ArrowSmallDownIcon className="w-4 h-4" />
            </th>
            <th className="w-5/12 px-2 md:px-4 py-2 font-normal text-neutral-400">Question</th>
            <th className="hidden md:table-cell px-4 py-2 font-normal text-neutral-400">Level</th>
            <th className="px-2 md:px-4 py-2 font-normal text-neutral-400">Status</th>
            <th className="hidden sm:table-cell px-2 md:px-4 py-2 font-normal text-neutral-400">Last submitted</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <QuestionTableList
              key={question.id}
              id={question.id}
              index={index}
              name={question.name}
              description={question.description}
              level={question.level}
              status={question.status}
              lastSubmitted={question.lastSubmitted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
