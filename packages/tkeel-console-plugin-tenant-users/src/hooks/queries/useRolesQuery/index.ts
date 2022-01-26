import { getLocalUserInfo } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-users/hooks/useQuery';

const method = 'GET';

export interface User {
  tenant_id: string;
  user_id: string;
  external_id: string;
  username: string;
  email: string;
  nick_name: string;
  avatar: string;
  create_at: string;
  roles: string[];
}

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useRolesQuery() {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/rudder/v1/rbac/tenant/${tenantId}/roles`;

  return useQuery<ApiData>({
    url,
    method,
  });
}
