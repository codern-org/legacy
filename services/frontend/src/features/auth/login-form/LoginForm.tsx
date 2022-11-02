import GoogleIcon from '@/assets/google-icon.svg';
import { AnchorLink } from '@/features/common/AnchorLink';
import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

export const LoginForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean[]>([false, false]);

  const login = (buttonIndex: number) => {
    // TODO: add real logic
    setIsLoggingIn([buttonIndex === 0, buttonIndex === 1]);
    setTimeout(() => {
      setIsLoggingIn([buttonIndex === 0, buttonIndex === 1]);
      route('/dashboard');
    }, 1000);
  };

  return (
    <form className="flex flex-col space-y-5">
      <div className="mb-2">
        <Text color="primary" className="text-3xl font-medium mb-2">Welcome back</Text>
        <Text color="secondary">Start coding and improve your skills!</Text>
      </div>

      <Input
        type="email"
        placeholder="Enter your email"
        label="Email"
      />
      <Input
        type="password"
        placeholder="Enter your password"
        label="Password"
      />
      <Input
        type="checkbox"
        label="Remember me"
      />

      <Button
        loading={isLoggingIn[0]}
        onClick={() => login(0)}
      >
        Login
      </Button>
      <Button
        color="secondary"
        loading={isLoggingIn[1]}
        onClick={() => login(1)}
      >
        <img src={GoogleIcon} alt="" className="w-4 h-4" />
        <span>Login with Google</span>
      </Button>
      
      <Text color="secondary" className="text-center">
        <span>Don't have an account?</span>&nbsp;
        <AnchorLink href="#" label="Sign up" />
      </Text>
    </form>
  );
};
