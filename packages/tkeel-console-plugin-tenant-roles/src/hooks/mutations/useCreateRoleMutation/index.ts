import useMutation from '@/tkeel-console-plugin-tenant-roles/hooks/useMutation';

export interface RequestData {
  name: string;
  desc?: string;
  permission_list?: { path: string }[];
}

interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateRoleMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const url = `/security/v1/rbac/roles`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
