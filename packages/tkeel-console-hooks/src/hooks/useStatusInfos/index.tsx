import { Theme, useTheme } from '@chakra-ui/react';

import { getStatusInfos } from '@tkeel/console-utils';

export default function useStatusInfos() {
  const { colors }: Theme = useTheme();
  return getStatusInfos({ colors });
}
