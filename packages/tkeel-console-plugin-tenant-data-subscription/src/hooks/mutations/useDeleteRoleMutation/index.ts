import { usePluginMutation } from '@tkeel/console-hooks';
import { getLocalUserInfo } from '@tkeel/console-utils';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteRoleMutation({
  role,
  onSuccess,
}: {
  role: string;
  onSuccess?: () => void;
}) {
  const { tenant_id: tenantId } = getLocalUserInfo();
  const url = `/security/v1/rbac/tenant/${tenantId}/roles/${role}`;

  return usePluginMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
