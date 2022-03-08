import { useQuery } from '@tkeel/console-hooks';

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

export default function useSubscribeInfoQuery(id: string) {
  const url = `/core-broker/v1/subscribe/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
  });
  return { data: data as ApiData, ...rest };
}
