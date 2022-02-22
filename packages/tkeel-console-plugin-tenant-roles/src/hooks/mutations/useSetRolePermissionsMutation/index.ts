import useMutation from '@/tkeel-console-plugin-tenant-roles/hooks/useMutation';

interface RequestData {
  name: string;
  // permission_list: string[];
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useSetRolePermissionsMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    // url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
