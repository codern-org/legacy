import { Text } from '@/features/common/Text';

type DashboardHeaderCard = {
  label: string,
  value: string | number,
};

export const DashboardHeaderCard = ({
  label,
  value,
}: DashboardHeaderCard) => {
  return (
    <div className="w-full sm:w-fit flex flex-row justify-between items-center space-x-2 px-4 py-2 md:p-4 bg-primary border border-primary rounded-md shadow transition-theme">
      <Text color="secondary" className="text-sm md:text-base">
        {label}
      </Text>
      <Text color="primary" className="text-lg md:text-xl font-bold text-right">
        {value}
      </Text>
    </div>
  );
};
