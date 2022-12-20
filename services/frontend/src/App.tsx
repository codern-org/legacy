import '@/assets/css/index.css';
import '@/assets/css/toast.css';

import { DashboardPage } from '@/pages/DashboardPage';
import { IndexPage } from '@/pages/IndexPage';
import Router, { Route } from 'preact-router';
import { WorkspacePage } from '@/pages/WorkspacePage';
import { QuestionPage } from '@/pages/QuestionPage';
import { AuthenticatedRoute } from '@/features/auth/AuthenticatedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotFoundPage } from '@/pages/error/NotFoundPage';
import { Toast } from '@/features/common/Toast';

export const App = () => {
  return (
    <AuthProvider>
      <Toast />

      <Router>
        <Route
          path="/"
          component={IndexPage}
        />

        <AuthenticatedRoute
          path="/dashboard"
          component={DashboardPage}
        />
        <AuthenticatedRoute
          path="/workspace/:workspaceId"
          component={WorkspacePage}
        />
        <AuthenticatedRoute
          path="/workspace/:workspaceId/:questionId"
          component={QuestionPage}
        />

        <Route
          default
          component={NotFoundPage}
        />
      </Router>
    </AuthProvider>
  );
};

