import { getLocalUserInfo } from '@tkeel/console-utils';

import useMutation from '@/tkeel-console-plugin-tenant-users/hooks/useMutation';

interface RequestData {
  username: string;
  nick_name?: string;
  roles: string[];
}

export interface ApiData {
  '@type': string;
  tenant_id: string;
  user_id: string;
  username: string;
}

const method = 'POST';

export default function useCreateUserMutation() {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/tenants/${tenantId}/users`;

  return useMutation<ApiData, undefined, RequestData>({ url, method });
}
