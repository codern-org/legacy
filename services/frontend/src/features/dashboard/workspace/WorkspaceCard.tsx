import { Row } from '@/features/common/layout/Row';
import { Text } from '@/features/common/Text';
import MockupAvatar from '@/assets/mockup-avatar.svg';
import { classNames } from '@/utils/Classes';
import { route } from 'preact-router';

type WorkspaceCardProps = {
  title: string,
  creator: string,
  creatorProfile: string,
  progress: number,
  participants: number,
  special?: boolean,
};

const randomHexColor = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');

export const WorkspaceCard = ({
  title,
  creator,
  creatorProfile,
  progress,
  participants,
  special,
}: WorkspaceCardProps) => {
  return (
    // TODO: break down into component
    <div
      className={classNames(
        "flex flex-row justify-center items-center space-x-2 p-6 border rounded-md text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white bg-white dark:bg-black shadow-lg transition-all ease-in duration-200",
        special ? 'border-2 hover:border-4 border-gradient-1' : 'border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white',
      )}
      onClick={() => route(`/workspace/${creator}/${title}`)}
    >
      <div className="w-full flex flex-col">
        <Row center="secondary" className="space-x-2 mb-4">
          <span className={`w-10 h-10 flex justify-center items-center bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-colors ease-in duration-200`} style={{ backgroundImage: `url(${creatorProfile})` }} />
          <div className="flex flex-col items-start">
            <Text className="text-base font-semibold">{title}</Text>
            <Text color="secondary" className="text-sm font-semibold">{creator}</Text>
          </div>
        </Row>

        <Text color="secondary" className="text-xs mr-auto mb-1">Participants</Text>
        <Row center="secondary" className="-space-x-3 mb-2 transform -translate-x-1">
          {/* TODO: real image */}
          {Array(participants).fill(participants).slice(0, 5).map((_, i) => (
            <img
              key={i}
              src={`https://source.boringavatars.com/beam?colors=${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()}`}
              alt=""
              className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200"
            />
          ))}

          {participants > 5 && (
            <div className="w-7 h-7 flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-400 rounded-full border-4 border-white dark:border-black transition-colors ease-in duration-200">
              <span className="text-xs">+</span>
              <span className="text-xs">{participants - 5}</span>
            </div>
          )}
        </Row>

        <div className="flex flex-col items-start">
          <Text color="secondary" className="text-xs mb-1">Progress ({progress}%)</Text>
          <div className="bg-neutral-400 dark:bg-neutral-700 w-full h-2.5 rounded-full transition-colors ease-in duration-200">
            <div className="h-2.5 bg-black dark:bg-neutral-400 rounded-full transition-colors ease-in duration-200" style={`width: ${progress}%`} />
          </div>
        </div>
      </div>
    </div>
  );
};
