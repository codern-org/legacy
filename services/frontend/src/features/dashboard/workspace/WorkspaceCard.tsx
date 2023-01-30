import { ProgressBar } from '@/features/common/ProgressBar';
import { Text } from '@/features/common/Text';
import { classNames } from '@/utils/Common';
import { route } from 'preact-router';

const MAX_PROFILE_DISPLAY = 5;

type WorkspaceCardProps = {
  id: number,
  name: string,
  ownerName: string,
  profilePath: string,
  // progress: number,
  participantsProfile: string[],
  special?: boolean,
};

export const WorkspaceCard = ({
  id,
  name,
  ownerName,
  profilePath,
  // progress,
  participantsProfile,
  special,
}: WorkspaceCardProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col p-6 border rounded-md bg-primary shadow-md transition-theme hover:cursor-pointer",
        special ? 'border-2 border-gradient-1' : 'border-primary border-primary-hover',
      )}
      onClick={() => route(`/workspace/${id}`)}
    >
      <div className="flex flex-row items-center space-x-2 mb-4">
        <span
          className="w-10 h-10 flex-none bg-neutral-100 dark:bg-neutral-700 bg-cover bg-center rounded-md transition-theme"
          style={{ backgroundImage: `url(${profilePath})` }}
        />
        <div className="flex flex-col items-start">
          <Text className="text-base font-semibold">{name}</Text>
          <Text color="secondary" className="text-sm font-semibold">{ownerName}</Text>
        </div>
      </div>

      <div className="flex flex-col">
        <Text color="secondary" className="text-xs mr-auto mb-1">Participants</Text>
        <div className="flex flex-row items-center -space-x-3 mb-2 transform -translate-x-1">
          {participantsProfile.slice(0, MAX_PROFILE_DISPLAY).map((url, i) => (
            <img
              key={i}
              src={url}
              alt=""
              className="w-7 h-7 rounded-full bg-white dark:bg-black border-4 border-white dark:border-black transition-theme"
            />
          ))}

          {participantsProfile.length > MAX_PROFILE_DISPLAY && (
            <div className="h-7 flex justify-center items-center px-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-400 rounded-full border-4 border-white dark:border-black transition-theme">
              <span className="text-xs">+</span>
              <span className="text-xs">{participantsProfile.length - MAX_PROFILE_DISPLAY}</span>
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex flex-col items-start">
        <Text color="secondary" className="text-xs mb-1">Progress ({progress}%)</Text>
        <ProgressBar progress={progress} />
      </div> */}
    </div>
  );
};
