import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

export default function useDeleteUserMutation({
  tenantId,
  userId,
  onSuccess,
}: {
  tenantId: string;
  userId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}/user/${userId}/pwd`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
