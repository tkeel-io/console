import { getLocalUserInfo } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'GET';

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useRolesQuery() {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/rbac/tenant/${tenantId}/roles`;

  const { data, ...rest } = useQuery<ApiData>({ url, method });
  const roles = data?.roles ?? [];

  return { roles, data, ...rest };
}
