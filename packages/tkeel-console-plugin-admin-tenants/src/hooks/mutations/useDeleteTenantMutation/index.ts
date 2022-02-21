import useMutation from '@/tkeel-console-plugin-admin-tenants/hooks/useMutation';

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

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
