import { useMutation } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

type Args = {
  roleId: string;
  onSuccess?: () => void;
};

export default function useDeleteRoleMutation({ roleId, onSuccess }: Args) {
  const url = `/security/v1/rbac/roles/${roleId}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method: 'DELETE',
    reactQueryOptions: { onSuccess },
  });
}
