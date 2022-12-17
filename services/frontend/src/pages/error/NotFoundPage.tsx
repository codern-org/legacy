import { Button } from '@/features/common/Button';
import { CodernLogo } from '@/features/common/CodernLogo';
import { MojiBunMascot } from '@/features/common/MojiBunMascot';
import { Text } from '@/features/common/Text';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { route } from 'preact-router';

export const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-primary border-b border-primary transition-theme">
        <div className="container flex flex-row justify-between items-center px-6 py-4">
          <CodernLogo className="scale-105" />
        </div>
      </nav>

      <div className="w-full h-full flex flex-row justify-center items-center bg-primary">
        <div className="flex flex-row items-end space-x-14">
          <MojiBunMascot className="w-64 h-64" />
          <div className="flex flex-col">
            <Text color="primary" className="text-6xl font-bold">404</Text>
            <Text color="primary" className="text-2xl font-semibold">Page Not Found</Text>
            <Text color="secondary" className="text-m mt-2">Don't know where you are? We really have no idea either</Text>

            <Button
              color="primary"
              className="w-fit mt-4 px-4 space-x-2"
              onClick={() => route('/')}
            >
              <ArrowUturnLeftIcon className="w-4 h-4" />
              <span>Back to home</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
