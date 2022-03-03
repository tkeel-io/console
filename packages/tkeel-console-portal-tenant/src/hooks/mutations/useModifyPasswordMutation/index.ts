import { usePortalMutation } from '@tkeel/console-hooks';

export interface RequestData {
  new_password: string;
  refresh_token: string;
}

type ApiData = {
  '@type': string;
  tenant_id: string;
};

export default function useModifyPasswordMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return usePortalMutation<ApiData, undefined, RequestData>({
    url: '/security/v1/oauth/pwd',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
