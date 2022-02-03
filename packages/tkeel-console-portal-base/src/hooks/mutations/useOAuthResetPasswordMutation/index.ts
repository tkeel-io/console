import useMutation from '@/tkeel-console-portal-base/hooks/useMutation';

interface RequestData {
  tenant_id: string;
  user_id: string;
  new_password: string;
}

export interface ApiData {
  '@type': string;
}

const url = '/security/v1/oauth/pwd';
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
  });
}
