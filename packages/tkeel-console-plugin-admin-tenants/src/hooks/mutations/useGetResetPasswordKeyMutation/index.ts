import useMutation from '@/tkeel-console-plugin-admin-tenants/hooks/useMutation';

export interface ApiData {
  '@type': string;
  tenant_id: string;
  user_id: string;
  username: string;
  nick_name: string;
  reset_key: string;
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
  const url = `/security/v1/tenants/${tenantId}/users/${userId}/rpk`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
