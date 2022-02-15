import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'POST';

export interface ApiData {
  '@type': string;
  roles: string[];
}

export default function useListSubscribeQuery() {
  const url = `/core-broker/v1/subscribe/list`;
  const { data, ...rest } = useQuery<ApiData>({ url, method });
  return { data, ...rest };
}
