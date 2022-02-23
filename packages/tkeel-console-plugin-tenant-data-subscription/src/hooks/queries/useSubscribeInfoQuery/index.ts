import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'GET';
export interface ApiData {
  '@type': string;
  count: string;
  created_at: string;
  description: string;
  endpoint: string;
  id: string;
  is_default: boolean;
  title: string;
  updated_at: string;
}

type RequestData = {
  id: string;
};

const defaultValue = {
  '@type': '',
  count: '',
  created_at: '',
  description: '',
  endpoint: '',
  id: '',
  is_default: false,
  title: '',
  updated_at: '',
};

export default function useSubscribeInfoQuery(id: string) {
  const url = `/core-broker/v1/subscribe/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
  });
  return { data: data || defaultValue, ...rest };
}
