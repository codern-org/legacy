import { CodernLogo } from '@/features/common/CodernLogo';
import { LoginForm } from '@/features/auth/login-form/LoginForm';
import { SwitchThemeButton } from '@/features/common/SwitchThemeButton';
import { Copyright } from '@/features/common/Copyright';

export const IndexPage = () => {
  return (
    <>
      <header className="absolute top-0 w-full lg:w-1/2 p-6">
        <CodernLogo />
      </header>

      <main className="h-screen flex flex-row bg-primary transition-theme">
        <section className="w-full lg:w-1/2 max-w-lg m-auto px-10">
          <LoginForm />
        </section>

        <section className="hidden lg:block w-1/2 h-full bg-gradient-to-tl from-neutral-400 dark:from-neutral-800 to-neutral-100 dark:to-neutral-500">
          <div className="h-full flex justify-center items-center text-4xl font-bold text-white">
            Currently Maintenance
          </div>
        </section>
      </main>

      <footer className="absolute bottom-0 w-full lg:w-1/2 p-6">
        <div className="flex flex-row justify-between items-end">
          <Copyright />
          <SwitchThemeButton direction="top" />
        </div>
      </footer>
    </>
  );
};
