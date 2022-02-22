import { getLocalUserInfo } from '@tkeel/console-utils';
import useMutation from 'packages/tkeel-console-plugin-tenant-device-templates/src/hooks/useMutation';

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

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
