import { getLocalUserInfo } from '@tkeel/console-utils';

import useMutation from '@/tkeel-console-plugin-tenant-roles/hooks/useMutation';

/* interface Permission {
  path: string;
} */

interface RequestData {
  name: string;
  desc?: string;
  permission_list?: { path: string }[];
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
