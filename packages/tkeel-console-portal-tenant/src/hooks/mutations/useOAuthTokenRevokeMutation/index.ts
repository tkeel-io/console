import useMutation from '@/tkeel-console-portal-tenant/hooks/useMutation';

export interface RequestData {
  refresh_token: string;
}

type ApiData = {
  '@type': string;
  tenant_id: string;
  revoked: boolean;
};

export default function useOAuthModifyPasswordMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/security/v1/oauth/token/revoke',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
