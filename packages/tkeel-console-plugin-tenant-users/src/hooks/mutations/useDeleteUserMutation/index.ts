import useMutation from '@/tkeel-console-plugin-tenant-users/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteUserMutation({
  tenantId,
  userId,
  onSuccess,
}: {
  tenantId: string;
  userId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}/users/${userId}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
