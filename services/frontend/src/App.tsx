import '@/assets/css/index.css';
import { DashboardPage } from '@/pages/DashboardPage';
import { IndexPage } from '@/pages/IndexPage';
import Router from 'preact-router';
import { WorkspacePage } from '@/pages/WorkspacePage';
import { QuestionPage } from '@/pages/QuestionPage';

export const App = () => {
  return (
    <Router>
      <IndexPage path="/" />
      <DashboardPage path="/dashboard" />
      <WorkspacePage path="/workspace/:creatorId/:workspaceId" />
      <QuestionPage path="/workspace/:creatorId/:workspaceId/:questionId"/>
    </Router>
  );
};

