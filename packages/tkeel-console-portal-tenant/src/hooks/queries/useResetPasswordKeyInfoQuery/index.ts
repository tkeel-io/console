import useQuery from '@/tkeel-console-portal-tenant/hooks/useQuery';

const url = '/security/v1/tenants/users/rpk/info';
const method = 'POST';

type RequestData = {
  reset_key: string;
};

type ApiData = {
  '@type': string;
  user_id: string;
  username: string;
  nick_name: string;
  tenant_id: string;
};

type Args = {
  data: { reset_key: string };
  enabled?: boolean;
};

export default function useResetPasswordKeyInfoQuery({
  data,
  enabled = true,
}: Args) {
  return useQuery<ApiData, undefined, RequestData>({
    url,
    data,
    method,
    reactQueryOptions: {
      enabled,
    },
    extras: {
      isWithToken: false,
    },
  });
}
