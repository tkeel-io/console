import { usePluginMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
  tenant_id: string;
  user_id: string;
  username: string;
  nick_name: string;
  reset_key: string;
}

const method = 'GET';

export default function useGetResetPasswordKeyPluginMutation({
  tenantId,
  userId,
  onSuccess,
}: {
  tenantId: string;
  userId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}/users/${userId}/rpk`;

  return usePluginMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
