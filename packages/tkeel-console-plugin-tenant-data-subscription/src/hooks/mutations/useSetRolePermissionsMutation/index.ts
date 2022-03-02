import { usePluginMutation } from '@tkeel/console-hooks';

interface Permission {
  permission_action: string;
  permission_object: string;
}

interface RequestData {
  permissions: Permission[];
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
  return usePluginMutation<ApiData, undefined, RequestData>({
    // url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
