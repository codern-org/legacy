import { Row } from '@/features/common/layout/Row';
import MockupAvatar from '@/assets/mockup-avatar.svg';
import { Input } from '@/features/common/Input';

export const WorkspaceTableList = () => {
  return (
    // TODO: breakdown into component
    <tr>
      <td className="p-4 border-b border-zinc-200 dark:border-zinc-600">
        <Row center="secondary" className="space-x-4">
          <Input type="checkbox" />
          <span className="w-10 h-10 flex justify-center items-center bg-zinc-100 dark:bg-zinc-700 bg-cover bg-center bg-[url(https://bangmodhackathon.com/logo.webp)] rounded-lg" />
          <div>
            <p className="font-semibold dark:text-white">Bangmod Hackathon 2023</p>
            <p className="text-sm font-semibold text-zinc-500">KMUTT</p>
          </div>
        </Row>
      </td>

      <td className="p-4 border-b border-zinc-200 dark:border-zinc-600">
        <div className="w-fit bg-green-100 text-green-700 font-semibold text-xs px-2 py-1 rounded-lg">In Progress</div>
      </td>
      
      <td className="p-4 border-b border-zinc-200 dark:border-zinc-600">
        <Row center="secondary" className="-space-x-2">
          <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-full border-4 border-white dark:border-black" />
          <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-full border-4 border-white dark:border-black" />
          <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-full border-4 border-white dark:border-black" />
          <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-full border-4 border-white dark:border-black" />
          <img src={MockupAvatar} alt="" className="w-8 h-8 rounded-full border-4 border-white dark:border-black" />
          <div className="w-8 h-8 flex justify-center items-center bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-400 rounded-full border-4 border-white dark:border-black">
            <span className="text-xs">+</span>
            <span className="text-sm">2</span>
          </div>
        </Row>
      </td>

      <td className="p-4 border-b border-zinc-200 dark:border-zinc-600">
        <div className="bg-zinc-200 dark:bg-zinc-700 w-full h-2.5 rounded-full">
          <div className="h-2.5 bg-black dark:bg-zinc-200 rounded-full" style={`width: 30%`} />
        </div>
      </td>
    </tr>
  );
};
