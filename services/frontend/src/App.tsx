import '@/assets/css/index.css';
import { useInitTheme } from '@/store/ThemeStore';
import { DashboardPage } from '@/pages/DashboardPage';
import { IndexPage } from '@/pages/IndexPage';
import Router from 'preact-router';

export const App = () => {
  useInitTheme();

  return (
    <Router>
      <IndexPage path="/" />
      <DashboardPage path="/dashboard" />
    </Router>
  );
};

