import { usePluginMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteTenantMutation({
  tenantId,
  onSuccess,
}: {
  tenantId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}`;

  return usePluginMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
