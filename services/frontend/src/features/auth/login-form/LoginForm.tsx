import GoogleIcon from '@/assets/google-icon.svg';
import { AnchorLink } from '@/features/common/AnchorLink';
import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { fetch } from '@/utils/Fetch';
import { PublicGoogleAuthUrlResponse } from '@codern-api/external';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

enum LoginProvider {
  SELF,
  GOOGLE,
};

export const LoginForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<LoginProvider>();

  const login = () => {
    // TODO: add real logic
    setIsLoggingIn(LoginProvider.SELF);
    setTimeout(() => {
      setIsLoggingIn(undefined);
      route('/dashboard');
    }, 1000);
  };

  const loginWithGoogle = () => {
    // TODO: error handling
    setIsLoggingIn(LoginProvider.GOOGLE);
    fetch
      .get<PublicGoogleAuthUrlResponse>('/auth/google')
      .then((response) => window.location.href = response.data.url)
      .catch(() => {});
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
        loading={isLoggingIn === LoginProvider.SELF}
        onClick={login}
      >
        Login
      </Button>
      <Button
        color="secondary"
        loading={isLoggingIn === LoginProvider.GOOGLE}
        onClick={loginWithGoogle}
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
