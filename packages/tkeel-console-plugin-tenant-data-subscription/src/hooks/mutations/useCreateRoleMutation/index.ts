import { usePluginMutation } from '@tkeel/console-hooks';
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

  return usePluginMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
