import useMutation from '@/tkeel-console-portal-base/hooks/useMutation';

interface RequestParams {
  password?: string;
}

export interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const url = '/rudder/v1/oauth2/admin';
const method = 'GET';

export default function useOAuthAdminTokenMutation() {
  return useMutation<ApiData, RequestParams>({
    url,
    method,
    extras: {
      isWithToken: false,
      handleNoAuth: false,
    },
  });
}
