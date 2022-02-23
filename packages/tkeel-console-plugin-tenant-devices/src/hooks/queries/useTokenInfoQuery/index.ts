import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const basicUrl = '/security/v1/entity/info';
const method = 'GET';

interface ApiData {
  '@type': string;
  entity_id: string;
  entity_type: string;
  owner: string;
  created_at: string;
  expired_at: string;
}
interface RequestParams {
  token: string;
}

export default function useTokenInfoQuery({ token }: RequestParams) {
  const url = `${basicUrl}/${token}`;
  return useQuery<ApiData>({
    url,
    method,
  });
}
