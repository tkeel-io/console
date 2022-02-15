import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'GET';

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useSubscribeQuery() {
  const id = '123';
  const url = `/security/v1/subscribe/${id}`;
  const { data, ...rest } = useQuery<ApiData>({ url, method });
  return { data, ...rest };
}
