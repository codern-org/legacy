import { Row } from '@/features/common/layout/Row';
import { DashboardContent } from '@/features/dashboard/content/DashboardContent';
import { DashboardSidebar } from '@/features/dashboard/sidebar/DashboardSidebar';

type DashboardPageProps = {
  path: string,
};

export const DashboardPage = ({
  path,
}: DashboardPageProps) => {
  return (
    <Row className="h-screen overflow-hidden">
      <DashboardSidebar />
      <DashboardContent />
    </Row>
  );
};
