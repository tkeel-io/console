import { useTheme } from '@chakra-ui/react';

import type { Theme } from '@tkeel/console-themes';

export default function useColors() {
  const theme = useTheme<Theme>();

  return theme.colors;
}
