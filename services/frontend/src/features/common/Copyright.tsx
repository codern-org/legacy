import { Text } from '@/features/common/Text';

export const Copyright = () => {
  return (
    <Text color="secondary" className="text-sm">
      © {new Date().getFullYear()} Vectier. All rights reserved.
    </Text>
  );
};
