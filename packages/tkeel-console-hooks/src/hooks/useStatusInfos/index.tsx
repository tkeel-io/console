import { useTheme } from '@chakra-ui/react';

import { Theme } from '@tkeel/console-themes';
import { getStatusInfos } from '@tkeel/console-utils';

export default function useStatusInfos() {
  const { colors }: Theme = useTheme();
  return getStatusInfos({ colors });
}
