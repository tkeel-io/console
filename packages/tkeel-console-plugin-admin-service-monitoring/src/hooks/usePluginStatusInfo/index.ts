import { useTheme } from '@chakra-ui/react';

import { Theme } from '@tkeel/console-themes';

import { getPluginStatusInfo } from '@/tkeel-console-plugin-admin-service-monitoring/constants/plugins';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

export default function usePluginStatusInfo({
  status,
}: {
  status: PluginStatus;
}) {
  const { colors }: Theme = useTheme();
  return getPluginStatusInfo({ status, colors });
}
