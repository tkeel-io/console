import { usePortalMutation } from '@tkeel/console-hooks';

export interface RequestData {
  new_password: string;
}

type ApiData = {
  '@type': string;
  tenant_id: string;
};

export default function useOAuthAdminModifyPasswordMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return usePortalMutation<ApiData, undefined, RequestData>({
    url: '/rudder/v1/oauth2/pwd',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
