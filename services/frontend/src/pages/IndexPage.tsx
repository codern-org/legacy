import { CodernLogo } from '@/features/common/CodernLogo';
import { LoginForm } from '@/features/auth/login-form/LoginForm';
import { Text } from '@/features/common/Text';
import { SwitchThemeButton } from '@/features/common/SwitchThemeButton';
import { Row } from '@/features/common/layout/Row';

type IndexPageProps = {
  path: string,
};

export const IndexPage = ({
  path,
}: IndexPageProps) => {
  return (
    <>
      <header className="absolute top-0 w-full lg:w-1/2 flex-row-y-center p-6">
        <CodernLogo />
      </header>

      <main className="h-screen flex flex-row dark:bg-black transition-colors ease-in duration-200">
        <section className="w-full lg:w-1/2 max-w-lg m-auto px-10">
          <LoginForm />
        </section>
        <section className="hidden lg:block w-1/2 h-full bg-gradient-to-tl from-neutral-400 dark:from-neutral-800 to-neutral-100 dark:to-neutral-500 transition-colors ease-in duration-200">
          <div className="h-full flex justify-center items-center text-4xl font-bold text-white">
            Advertise
          </div>
        </section>
      </main>

      <footer className="absolute bottom-0 w-full lg:w-1/2 p-6">
        <Row className="justify-between items-end">
          <Text color="secondary" className="text-sm">
            © {new Date().getFullYear()} Vectier. All rights reserved.
          </Text>
          <SwitchThemeButton direction="top" />
        </Row>
      </footer>
    </>
  );
};
