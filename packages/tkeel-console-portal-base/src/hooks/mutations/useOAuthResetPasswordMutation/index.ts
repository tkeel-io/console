import useMutation from '@/tkeel-console-portal-base/hooks/useMutation';

type RequestData = {
  reset_key: string;
  new_password: string;
};

type ApiData = {
  '@type': string;
  has_reset: boolean;
  tenant_id: string;
};

/* cspell: disable-next-line */
const url = '/security/v1/oauth/rspwd';
const method = 'POST';

export default function useOAuthResetPasswordMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
    extras: {
      isWithToken: false,
      handleNoAuth: false,
    },
  });
}
