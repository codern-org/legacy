import { DebouncedInput } from '@/features/common/DebouncedInput';
import { Text } from '@/features/common/Text';
import { QuestionStatusBadge } from '@/features/workspace/QuestionStatusBadge';
import { classNames } from '@/utils/Classes';
import { PublicQuestion } from '@codern/external';
import { Timestamp } from '@codern/shared';
import { MagnifyingGlassIcon, ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import { rankItem } from '@tanstack/match-sorter-utils';
import { createColumnHelper, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { getCurrentUrl, route } from 'preact-router';
import { useState } from 'preact/hooks';

const columnHelper = createColumnHelper<PublicQuestion>();
const hiddenColumnOnSm = ['lastSubmitted'];

const columns = [
  columnHelper.accessor((row, number) => number + 1, {
    id: 'id',
    header: '#',
    cell: (info) => (<Text color="secondary">{info.getValue()}</Text>),
  }),
  columnHelper.accessor((row) => `${row.name} ${row.description}`, {
    header: 'Question',
    cell: ({ row }) => (<>
      <Text color="primary" className="font-medium">{row.original.name}</Text>
      <Text color="secondary" className="hidden md:block text-sm">{row.original.description}</Text>
    </>),
    filterFn: 'fuzzy' as any,
  }),
  columnHelper.accessor('level', {
    header: 'Level',
    cell: (info) => (
      <Text color="secondary" className="capitalize">{info.getValue().toLowerCase()}</Text>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (<QuestionStatusBadge status={info.getValue()} />),
  }),
  columnHelper.accessor('lastSubmitted', {
    header: 'Last submitted',
    cell: (info) => (
      (info.getValue() === 0)
        ? (
          <Text color="secondary">-</Text>
        ) : (<>
          <Text color="secondary" className="text-sm">
            {Timestamp.from(info.getValue()).toLocaleDateString('th-TH')}
          </Text>
          <Text color="secondary" className="text-xs">
            {Timestamp.from(info.getValue()).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </Text>
        </>)
    ),
  }),
];

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

type QuestionTableProps = {
  questions: PublicQuestion[],
};

export const QuestionTable = ({
  questions,
}: QuestionTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data: questions,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center space-x-4 mb-6">
        <div className="flex flex-row items-center space-x-2">
          <Text color="primary" className="text-2xl font-semibold">Question</Text>
          <Text color="secondary">({questions.length})</Text>
        </div>

        <DebouncedInput
          debounce={500}
          icon={<MagnifyingGlassIcon />}
          placeholder="Search by name, description, status"
          className="w-96"
          onChange={setGlobalFilter}
        />
      </div>

      <table className="table-auto text-left">
        <thead className="bg-neutral-100 dark:bg-neutral-900 outline outline-1 outline-neutral-300 dark:outline-neutral-700 rounded-md transition-all ease-in duration-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={classNames(
                    'px-4 py-2 font-normal text-neutral-400',
                    hiddenColumnOnSm.includes(header.id) && 'hidden sm:table-cell',
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : (
                      <div className="flex flex-row items-center cursor-pointer select-none">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowSmallUpIcon className="w-4 h-4 ml-1" />,
                          desc: <ArrowSmallDownIcon className="w-4 h-4 ml-1" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => route(getCurrentUrl() + '/' + row.getValue('id'))}
              className="border-b border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    'p-4',
                    hiddenColumnOnSm.includes(cell.column.id) && 'hidden sm:table-cell',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
