import { useMutation } from '@tkeel/console-hooks';

export interface Params {
  grant_type: 'password' | 'authorization_code';
  username?: string;
  password?: string;
}

interface ApiData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

const url = '/security/v1/oauth/token';
const method = 'GET';

export default function useLoginMutation() {
  return useMutation<ApiData>({
    url,
    method,
    extras: {
      isWithToken: false,
    },
  });
}
