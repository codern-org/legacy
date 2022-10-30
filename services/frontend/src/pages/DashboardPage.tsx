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
    <Row className="h-screen">
      <div className="w-full max-w-fit">
        <DashboardSidebar />
      </div>

      <div className="w-full">
        <DashboardContent />
      </div>
    </Row>
  );
};
