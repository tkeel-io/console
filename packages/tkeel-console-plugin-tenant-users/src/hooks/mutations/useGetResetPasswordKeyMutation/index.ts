import useMutation from '@/tkeel-console-plugin-tenant-users/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

const method = 'GET';

export default function useGetResetPasswordKeyMutation({
  tenantId,
  userId,
  onSuccess,
}: {
  tenantId: string;
  userId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}/user/${userId}/rpk`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
