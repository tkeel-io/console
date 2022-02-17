import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const method = 'GET';
type Data = {
  description: string;
  endpoint: string;
  id: string;
  title: string;
};

export interface ApiData {
  '@type': string;
  data: Data[];
}
type RequestData = {
  id: string;
};

// type Props = {
//   id: string;
// };

export default function useSubscribeInfoQuery(id: string) {
  const url = `/core-broker/v1/subscribe/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
  });
  return { data: data?.data || [], ...rest };
}
