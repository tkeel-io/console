import useQuery from '@/tkeel-console-portal-base/hooks/useQuery';

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

export default function useMenusQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url: '/security/v1/oauth/authenticate',
    method: 'GET',
  });
  const userInfo = data;

  return { userInfo, data, ...rest };
}
