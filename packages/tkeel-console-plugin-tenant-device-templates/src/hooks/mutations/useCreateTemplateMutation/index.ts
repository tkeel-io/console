import useMutation from 'packages/tkeel-console-plugin-tenant-device-templates/src/hooks/useMutation';

import { getLocalUserInfo } from '@tkeel/console-utils';

interface RequestData {
  role: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateRoleMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/rbac/tenant/${tenantId}/roles`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
