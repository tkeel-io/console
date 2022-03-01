import { RequestExtras } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-portal-tenant/hooks/useQuery';

export interface ApiData {
  '@type': string;
  expires_in: string;
  user_id: string;
  username: string;
  external_id: string;
  nick_name: string;
  avatar: string;
  tenant_id: string;
}

type Options = {
  extras?: RequestExtras;
};

export default function useOAuthAuthenticateQuery({ extras }: Options = {}) {
  const { data, ...rest } = useQuery<ApiData>({
    url: '/security/v1/oauth/authenticate',
    method: 'GET',
    extras,
  });
  const userInfo = data;

  return { userInfo, data, ...rest };
}
