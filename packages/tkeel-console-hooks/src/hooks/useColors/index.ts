import { useTheme } from '@chakra-ui/react';

import type { Theme } from '@tkeel/console-themes';

export default function useColors() {
  const theme: Theme = useTheme();

  return theme.colors;
}
