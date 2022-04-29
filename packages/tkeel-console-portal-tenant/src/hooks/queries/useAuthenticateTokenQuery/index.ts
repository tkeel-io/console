import { useQuery } from '@tkeel/console-hooks';
import { AuthType } from '@tkeel/console-types';
import { RequestExtras } from '@tkeel/console-utils';

export interface ApiData {
  '@type': string;
  auth_type: AuthType;
  expires_in: string;
  user_id: string;
  username: string;
  external_id: string;
  nick_name: string;
  avatar: string;
  tenant_id: string;
}

type Options = {
  queryKey?: string;
  extras?: RequestExtras;
};

export default function useAuthenticateTokenQuery({
  queryKey,
  extras,
}: Options = {}) {
  const { data, ...rest } = useQuery<ApiData>({
    url: '/security/v1/oauth/authenticate',
    method: 'GET',
    extras,
    reactQueryOptions: {
      queryKey,
    },
  });
  const userInfo = data;

  return { userInfo, data, ...rest };
}
