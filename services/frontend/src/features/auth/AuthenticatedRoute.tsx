import { AuthStatus, usePreAuth } from '@/contexts/AuthContext';
import { LoadingScreen } from '@/features/auth/LoadingScreen';
import { FunctionalComponent } from 'preact';
import { route, Route } from 'preact-router';
import { useEffect } from 'preact/hooks';

type AuthenticatedRouteProps = {
  path: string,
  component: FunctionalComponent<any>,
};

export const AuthenticatedRoute = ({
  path,
  component,
  ...props
}: AuthenticatedRouteProps) => {
  const { user, authStatus } = usePreAuth();

  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) route('/', true);
  }, [authStatus]);

  if ((authStatus !== AuthStatus.AUTHENTICATED) && (!user)) return (<LoadingScreen />);

  return (<Route path={path} component={component} {...props} />);
};
