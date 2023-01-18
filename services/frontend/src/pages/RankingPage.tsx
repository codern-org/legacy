import { CodernLogo } from '@/features/common/CodernLogo';
import { Copyright } from '@/features/common/Copyright';
import { fetch } from '@/utils/Fetch';
import { PublicRank } from '@codern/external';
import { Timestamp } from '@codern/shared';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

const columnHelper = createColumnHelper<PublicRank>();

const columns = [
  columnHelper.accessor((row, number) => number + 1, {
    id: 'number',
    header: 'Rank',
    cell: (info) => (<div className="text-neutral-200">{info.getValue()}</div>),
  }),
  columnHelper.accessor('userId', {
    header: 'Name',
    cell: (info) => (<div className="text-neutral-200 font-semibold">{info.getValue()}</div>),
  }),
  columnHelper.accessor('totalScore', {
    header: 'Score',
    cell: (info) => (<div className="text-neutral-200">{info.getValue()}</div>),
  }),
  columnHelper.accessor('lastUploadedAt', {
    header: 'Last Submitted',
    cell: (info) => (<div className="text-neutral-400">{Timestamp.from(info.getValue()).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>),
  }),
];

// TODO: hardcoded for BMH2023
export const RankingPage = () => {
  const [data, setData] = useState<PublicRank[]>([]);

  useEffect(() => {
    let updater: number;

    const update = () => fetch('/workspaces/ranking')
      .then((response) => setData(response.data))
      .catch(() => toast.error('Cannot retrieve score data'));

    update();
    updater = setInterval(() => update(), 20 * 1000);

    return () => clearInterval(updater);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen h-screen flex flex-col bg-black">
      <nav className="bg-primary border-b border-primary transition-theme">
        <div className="container flex flex-row justify-between items-center px-6 py-4">
          <CodernLogo className="scale-105" />
        </div>
      </nav>

      <main className="h-full container flex flex-col p-4 overflow-y-auto">
        <div className="flex flex-row justify-center items-center space-x-2 py-6">
          <img src="https://bangmodhackathon.com/logo.webp" alt="" className="w-14 h-14" />
          <div className="text-center text-2xl text-neutral-100 font-semibold">BangMod Hackathon 2023 Ranking</div>
        </div>

        <div className="h-full flex flex-col overflow-y-auto">
          <table className="table-auto">
            <thead className="bg-neutral-100 dark:bg-neutral-900 outline outline-1 outline-neutral-700 rounded-md transition-all ease-in duration-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-4 py-2 text-neutral-400"
                    >
                      {header.isPlaceholder
                        ? null
                        : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
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
                  className="text-center border-b border-neutral-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="w-full mt-auto py-2 text-center border-t border-primary">
        <Copyright />
      </footer>
    </div>
  );
};
