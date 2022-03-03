import { usePluginMutation } from '@tkeel/console-hooks';
import { getLocalTenantInfo } from '@tkeel/console-utils';

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
  reset_key: string;
}

const method = 'POST';

export default function useCreateUserMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { tenant_id: tenantId } = getLocalTenantInfo();
  const url = `/security/v1/tenants/${tenantId}/users`;

  return usePluginMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
