import { useColors } from '@tkeel/console-hooks';

import { getPodStatusInfo } from '@/tkeel-console-plugin-admin-service-monitoring/constants/pods';
import type { PodStatus } from '@/tkeel-console-plugin-admin-service-monitoring/types';

export default function usePodStatusInfo({ status }: { status: PodStatus }) {
  const colors = useColors();
  return getPodStatusInfo({ status, colors });
}
