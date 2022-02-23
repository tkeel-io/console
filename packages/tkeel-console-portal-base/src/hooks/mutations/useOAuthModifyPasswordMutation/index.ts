import useMutation from '@/tkeel-console-portal-base/hooks/useMutation';

export interface RequestData {
  new_password: string;
  refresh_token: string;
}

type ApiData = {
  '@type': string;
  has_reset: boolean;
  tenant_id: string;
};

export default function useOAuthModifyPasswordMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/security/v1/oauth/pwd',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
    extras: {
      isWithToken: false,
    },
  });
}
