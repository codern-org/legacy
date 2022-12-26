import { Text } from '@/features/common/Text';

export const Copyright = () => {
  return (
    <Text color="secondary" className="text-sm">
      © {new Date().getFullYear()} Vectier. All rights reserved.
      &nbsp;
      <a href="https://github.com/vectier/codern" target="_blank" className="text-xs text-neutral-900 dark:text-neutral-200">
        ({APP_VERSION})
      </a>
    </Text>
  );
};
