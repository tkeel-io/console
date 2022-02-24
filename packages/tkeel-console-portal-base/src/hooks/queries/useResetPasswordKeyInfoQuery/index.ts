import useQuery from '@/tkeel-console-portal-base/hooks/useQuery';

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

export default function useResetPasswordKeyInfoQuery({
  data,
}: {
  data: { reset_key: string };
}) {
  return useQuery<ApiData, undefined, RequestData>({
    url,
    data,
    method,
    extras: {
      isWithToken: false,
    },
  });
}
