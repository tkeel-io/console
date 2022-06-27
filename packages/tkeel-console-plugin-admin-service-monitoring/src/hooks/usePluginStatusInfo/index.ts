import { useColors } from '@tkeel/console-hooks';

import { getPluginStatusInfo } from '@/tkeel-console-plugin-admin-service-monitoring/constants/plugins';
import type { PluginStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

export default function usePluginStatusInfo({
  status,
}: {
  status: PluginStatus;
}) {
  const colors = useColors();
  return getPluginStatusInfo({ status, colors });
}
