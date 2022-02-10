import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

interface RequestData {
  nick_name?: string;
  roles: string[];
}

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

export default function useModifyUserMutation({
  tenantId,
  userId,
  onSuccess,
}: {
  tenantId: string;
  userId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}/users/${userId}`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
