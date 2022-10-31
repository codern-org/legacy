import { Row } from '@/features/common/layout/Row';
import { Text } from '@/features/common/Text';
import MockupAvatar from '@/assets/mockup-avatar.svg';

export const WorkspaceCard = () => {
  return (
    // TODO: break down into component
  
    <div className="flex flex-row justify-center items-center space-x-2 p-6 border rounded-md text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white bg-white dark:bg-black border-neutral-200 dark:border-neutral-700 hover:border-black dark:hover:border-white shadow-lg transition-colors ease-in duration-200">
      <div className="w-full flex flex-col">
        <Row className="space-x-2 mb-4">
          <span className="w-10 h-10 flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center bg-[url(https://bangmodhackathon.com/logo.webp)] rounded-lg transition-colors ease-in duration-200" />
          <div className="flex flex-col items-start">
            <Text className="text-lg font-semibold">Bangmod Hackathon</Text>
            <Text color="secondary" className="text-sm font-semibold">KMUTT</Text>
          </div>
        </Row>

        <Text color="secondary" className="text-xs mr-auto mb-1">Participants</Text>
        <Row center="secondary" className="-space-x-3 mb-2 transform -translate-x-1">
          <img src={MockupAvatar} alt="" className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200" />
          <img src={MockupAvatar} alt="" className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200" />
          <img src={MockupAvatar} alt="" className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200" />
          <img src={MockupAvatar} alt="" className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200" />
          <img src={MockupAvatar} alt="" className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200" />
          <div className="w-7 h-7 flex justify-center items-center bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-400 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200">
            <span className="text-xs">+</span>
            <span className="text-xs">2</span>
          </div>
        </Row>

        <div className="flex flex-col items-start">
          <Text color="secondary" className="text-xs mb-1">Progress (30%)</Text>
          <div className="bg-neutral-200 dark:bg-neutral-700 w-full h-2.5 rounded-full transition-colors ease-in duration-200">
            <div className="h-2.5 bg-black dark:bg-neutral-200 rounded-full transition-colors ease-in duration-200" style={`width: 30%`} />
          </div>
        </div>
      </div>
    </div>
  );
};
