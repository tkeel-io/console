import { getLocalUserInfo } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-roles/hooks/useQuery';

const method = 'GET';

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useRolesQuery() {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/rbac/tenant/${tenantId}/roles`;

  return useQuery<ApiData>({
    url,
    method,
  });
}
