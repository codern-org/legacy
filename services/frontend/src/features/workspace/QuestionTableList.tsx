import { Text } from '@/features/common/Text';
import { QuestionStatusBadge } from '@/features/workspace/QuestionStatusBadge';
import { PublicQuestionStatus } from '@codern/external';
import { getCurrentUrl, route } from 'preact-router';

type QuestionTableListProps = {
  id: number,
  index: number,
  name: string,
  description: string,
  level: string,
  status: PublicQuestionStatus,
  lastSubmitted: number,
};

export const QuestionTableList = ({
  id,
  index,
  name,
  description,
  level,
  status,
  lastSubmitted,
}: QuestionTableListProps) => {
  return (
    <tr
      className="border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:cursor-pointer"
      onClick={() => route(getCurrentUrl() + '/' + id)}
    >
      <td className="px-2 md:px-4 py-4">
        <Text color="secondary">{index + 1}</Text>
      </td>

      <td className="px-2 md:px-4 py-4">
        <Text color="primary" className="font-medium">{name}</Text>
        <Text color="secondary" className="hidden md:block text-sm">{description}</Text>
      </td>

      <td className="hidden md:table-cell px-2 md:px-4 py-4">
        <Text color="secondary" className="capitalize">{level.toLowerCase()}</Text>
      </td>

      <td className="px-2 md:px-4 py-4">
        <QuestionStatusBadge status={status} />
      </td>

      <td className="hidden md:table-cell px-2 md:px-4 py-4">
        <Text color="secondary" className="text-sm">
          {new Date(lastSubmitted).toLocaleDateString('th-TH')}
        </Text>
        <Text color="secondary" className="text-xs">
          {new Date(lastSubmitted).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Text>
      </td>
    </tr>
  );
};
