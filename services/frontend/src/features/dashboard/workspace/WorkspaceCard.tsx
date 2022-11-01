import { ProgressBar } from '@/features/common/ProgressBar';
import { Text } from '@/features/common/Text';
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
    <div
      className={classNames(
        "flex flex-col p-6 border rounded-md bg-primary shadow-md transition-all ease-in duration-300 hover:cursor-pointer",
        special ? 'border-2 border-gradient-1' : 'border-primary border-primary-hover',
      )}
      onClick={() => route(`/workspace/${creator}/${title}`)}
    >
      <div className="flex flex-row items-center space-x-2 mb-4">
        <span
          className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-theme"
          style={{ backgroundImage: `url(${creatorProfile})` }}
        />
        <div className="flex flex-col items-start">
          <Text className="text-base font-semibold">{title}</Text>
          <Text color="secondary" className="text-sm font-semibold">{creator}</Text>
        </div>
      </div>

      <div className="flex flex-col">
        <Text color="secondary" className="text-xs mr-auto mb-1">Participants</Text>
        <div className="flex flex-row items-center -space-x-3 mb-2 transform -translate-x-1">
          {/* TODO: real image */}
          {Array(participants).fill(participants).slice(0, 5).map((_, i) => (
            <img
              key={i}
              src={`https://source.boringavatars.com/beam?colors=${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()},${randomHexColor()}`}
              alt=""
              className="w-7 h-7 rounded-full border-4 border-white dark:border-black transition-all ease-in duration-100"
            />
          ))}

          {participants > 5 && (
            <div className="w-7 h-7 flex justify-center items-center bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-400 rounded-full border-4 border-white dark:border-black transition-all ease-in duration-100">
              <span className="text-xs">+</span>
              <span className="text-xs">{participants - 5}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start">
        <Text color="secondary" className="text-xs mb-1">Progress ({progress}%)</Text>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};
