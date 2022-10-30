import { CodernLogo } from '@/features/common/CodernLogo';
import { LoginForm } from '@/features/auth/login-form/LoginForm';
import { Text } from '@/features/common/Text';

type IndexPageProps = {
  path: string,
};

export const IndexPage = ({
  path,
}: IndexPageProps) => {
  return (
    <>
      <header className="absolute top-0 w-full flex-row-y-center p-6">
        <CodernLogo />
      </header>

      <div className="h-screen flex flex-row dark:bg-black">
        <section className="w-full lg:w-1/2 max-w-lg m-auto px-10">
          <LoginForm />
        </section>
        <section className="hidden lg:block w-1/2 h-full bg-gradient-to-tl from-zinc-400 dark:from-zinc-800 to-zinc-100 dark:to-zinc-500">
          <div className="h-full flex justify-center items-center text-4xl font-bold text-white">
            Advertise
          </div>
        </section>
      </div>

      <footer className="absolute bottom-0 w-full p-6">
        <Text color="secondary" className="text-sm">
          © {new Date().getFullYear()} Vectier. All rights reserved.
        </Text>
      </footer>
    </>
  );
};
