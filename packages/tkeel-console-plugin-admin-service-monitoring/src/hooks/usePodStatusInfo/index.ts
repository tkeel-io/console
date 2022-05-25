import { useTheme } from '@chakra-ui/react';

import { Theme } from '@tkeel/console-themes';

import { getPodStatusInfo } from '@/tkeel-console-plugin-admin-service-monitoring/constants/pods';
import type { PodStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

export default function usePodStatusInfo({ status }: { status: PodStatus }) {
  const { colors }: Theme = useTheme();
  return getPodStatusInfo({ status, colors });
}
