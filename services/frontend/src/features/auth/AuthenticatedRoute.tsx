import { AuthStatus, usePreAuth } from '@/contexts/AuthContext';
import { Authenticating } from '@/features/auth/Authenticating';
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
}: AuthenticatedRouteProps) => {
  const { user, authStatus } = usePreAuth();

  useEffect(() => {
    if (authStatus === AuthStatus.UNAUTHENTICATED) route('/', true);
  }, [authStatus]);

  if ((authStatus !== AuthStatus.AUTHENTICATED) && (!user)) return (<Authenticating />);

  return (<Route path={path} component={component} />);
};
