import { ReactNode } from 'react';

import { Badge } from '@tkeel/console-components';

import type { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';
import { Status } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

interface Props {
  policy: Policy;
  children: ReactNode;
}

const hasModified = (status: Status) => {
  return [Status.Modified, Status.Deleted].includes(status);
};

const getBadgeCount = (policy: Policy) => {
  if (
    hasModified(policy.tempStatus) ||
    hasModified(policy.deviceStatus) ||
    hasModified(policy.telemetryStatus)
  ) {
    return 1;
  }
  return 0;
};

export default function PolicyBadge({ policy, children }: Props) {
  return (
    <Badge count={getBadgeCount(policy)} dot>
      {children}
    </Badge>
  );
}
