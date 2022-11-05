import '@/assets/css/index.css';

import { DashboardPage } from '@/pages/DashboardPage';
import { IndexPage } from '@/pages/IndexPage';
import Router from 'preact-router';
import { WorkspacePage } from '@/pages/WorkspacePage';
import AsyncRoute from 'preact-async-route';

export const App = () => {
  return (
    <Router>
      <IndexPage path="/" />
      <DashboardPage path="/dashboard" />
      <WorkspacePage path="/workspace/:creatorId/:workspaceId" />

      <AsyncRoute
        path="/workspace/:creatorId/:workspaceId/:questionId"
        getComponent={() => import('@/pages/QuestionPage').then(module => module.default)}
      />
    </Router>
  );
};

