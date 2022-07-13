import { ReactNode } from 'react';

import { Badge } from '@tkeel/console-components';

import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import { Status } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

interface Props {
  policy: Policy;
  children: ReactNode;
}

const getBadgeCount = (policy: Policy) => {
  if (
    policy.tempStatus === Status.Deleted ||
    policy.deviceStatus === Status.Deleted ||
    [Status.Modified, Status.Deleted].includes(policy.telemetryStatus)
  ) {
    return 1;
  }
  return 0;
};

export default function PolicyBadge({ policy, children }: Props) {
  return (
    <Badge dot count={getBadgeCount(policy)}>
      {children}
    </Badge>
  );
}
