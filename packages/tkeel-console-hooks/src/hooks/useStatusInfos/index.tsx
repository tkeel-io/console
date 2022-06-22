import { useTheme } from '@chakra-ui/react';

import type { Theme } from '@tkeel/console-themes';
import { getStatusInfos } from '@tkeel/console-utils';

export default function useStatusInfos() {
  const { colors } = useTheme<Theme>();
  return getStatusInfos({ colors });
}
