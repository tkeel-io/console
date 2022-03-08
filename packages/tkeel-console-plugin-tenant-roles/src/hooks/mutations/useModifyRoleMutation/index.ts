import { useMutation } from '@tkeel/console-hooks';

import { RequestData as CreateRoleRequestData } from '@/tkeel-console-plugin-tenant-roles/hooks/mutations/useCreateRoleMutation';

export type RequestData = CreateRoleRequestData;

interface ApiData {
  '@type': string;
}

type Args = {
  roleId: string;
  onSuccess?: () => void;
};

export default function useModifyRoleMutation({ roleId, onSuccess }: Args) {
  const url = `/security/v1/rbac/roles/${roleId}`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
