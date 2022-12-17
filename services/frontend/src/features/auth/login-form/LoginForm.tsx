import GoogleIcon from '@/assets/google-icon.svg';
import axios from 'axios';
import { AnchorLink } from '@/features/common/AnchorLink';
import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { Text } from '@/features/common/Text';
import { fetch } from '@/utils/Fetch';
import { PublicAuthProvider, PublicGoogleAuthUrlResponse } from '@codern/external';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { usePreAuth } from '@/contexts/AuthContext';

type LoginFormData = {
  email: string,
  password: string,
  rememberMe: boolean,
};

export const LoginForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<PublicAuthProvider>();
  const [loginError, setLoginError] = useState<string>();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { auth } = usePreAuth();

  const login: SubmitHandler<LoginFormData> = (data) => {
    setIsLoggingIn(PublicAuthProvider.SELF);
    fetch
      .post('/auth/login', { ...data })
      .then(() => auth(() => route('/dashboard')))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const code = error.response?.status;
          const errorMessages = code ? {
            400: 'Password is incorrect',
            404: 'This email is not registered',
          }[code] : 'Something went wrong (code: unknown)';
          setLoginError(errorMessages);
        } else {
          setLoginError('Something went wrong');
        }
      })
      .finally(() => setIsLoggingIn(undefined));
  };

  const loginWithGoogle = () => {
    // TODO: error handling
    setIsLoggingIn(PublicAuthProvider.GOOGLE);
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

      {loginError && (
        <div className="flex flex-row items-center p-2 space-x-1 font-medium bg-red-500 text-white rounded-md">
          <XCircleIcon className="w-5 h-5" />
          <span>{loginError}</span>
        </div>
      )}

      <Input
        type="email"
        placeholder="Enter your email"
        label="Email"
        autoComplete="username"
        register={register}
        name="email"
        pattern={{
          value: /\S+@\S+\.\S+/,
          message: 'Please enter a valid email address'
        }}
        error={errors.email?.message}
        required
      />
      <Input
        type="password"
        placeholder="Enter your password"
        label="Password"
        autoComplete="password"
        register={register}
        name="password"
        error={errors.password?.message}
        required
      />
      <Input
        type="checkbox"
        label="Remember me"
        name="rememberMe"
        register={register}
      />

      <Button
        type="submit"
        loading={isLoggingIn === PublicAuthProvider.SELF}
        onClick={handleSubmit(login)}
      >
        Login
      </Button>

      <Button
        color="secondary"
        loading={isLoggingIn === PublicAuthProvider.GOOGLE}
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
