import { CodernLogo } from '@/features/common/CodernLogo';
import { Copyright } from '@/features/common/Copyright';
import { fetch } from '@/utils/Fetch';
import { PublicRank } from '@codern/external';
import { Timestamp } from '@codern/shared';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'preact/hooks';
import { toast } from 'react-toastify';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor((row, number) => number + 1, {
    id: 'number',
    header: 'Rank',
    cell: (info) => (<div className="text-neutral-200">{info.getValue()}</div>),
  }),
  columnHelper.accessor('displayName', {
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

const nameMap = [
  { id: '24', name: 'The universe sings for me' },
  { id: '47', name: 'สามบาทห้าสิบ' },
  { id: '71', name: 'Enuma Elish' },
  { id: '80', name: 'ครัวซองต์สลัด' },
  { id: '85', name: 'หาตังกินหนม' },
  { id: '94', name: 'นั่นสิ' },
  { id: '102', name: 'ม่ายมีความรู้' },
  { id: '104', name: 'เอ็มส่งมา' },
  { id: '116', name: 'Alpha C' },
  { id: '124', name: 'ชื่อทีมไรดี' },
  { id: '132', name: 'ถล่มบางมด' },
  { id: '135', name: 'okrubsarbruruang' },
  { id: '154', name: 'Tri-no-Three (TnT)' },
  { id: '158', name: 'NUD_วอมว่อ' },
  { id: '166', name: 'sacsade' },
  { id: '206', name: 'Roadto30k' },
  { id: '220', name: 'ร้านโจ๊กเจ๊หมวย' },
  { id: '245', name: 'ใจ' },
  { id: '264', name: 'กราบครับบ' },
  { id: '309', name: 'Galapagos' },
  { id: '339', name: 'PWCC' },
  { id: '345', name: 'Banthat All Star' },
  { id: '384', name: 'ฺBruteforce' },
  { id: '396', name: 'Om. G' },
  { id: '410', name: 'ฟอร์ดเรนเจอร์แร็พเตอร์' },
  { id: '413', name: 'Kimslick' },
  { id: '423', name: 'Namprikplatwo' },
  { id: '425', name: 'ioio' },
  { id: '464', name: 'เขียนโค้ดแบบดุดัน ไม่เกรงใจใคร' },
  { id: '466', name: 'อดนอนมาแข่งโค้ด' },
  { id: '506', name: 'TKR' },
  { id: '578', name: 'ยุทธศาสตร์ต้มยำกุ้ง' },
  { id: '579', name: 'BCC_3trios' },
  { id: '583', name: 'TripleP' },
  { id: '602', name: 'งอน coding' },
  { id: '553', name: 'เกมเม่อ ยูทูปเบ้อ สตรีมเม่อ อินฟูเลนเซ่อ อันดับหนึ่งของประเทศไทย' },
];

// TODO: hardcoded for BMH2023
export const RankingPage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    let updater: number;

    const update = () => fetch('/workspaces/ranking')
      .then((response) => {
        console.log(response.data);

        setData(response.data.map((entry: any) => {
          const expectedName = nameMap.find((e) => e.id === entry.userId)?.name;
          return {
            ...entry,
            displayName: expectedName || '-',
          };
        }));
      })
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
