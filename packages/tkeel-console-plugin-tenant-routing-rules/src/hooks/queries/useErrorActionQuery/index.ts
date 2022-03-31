import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
  id: string;
  title: string;
  endpoint: string;
}

const url = '/core-broker/v1/subscribe';
const method = 'GET';

export default function useErrorActionQuery(subscribeId: number) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${subscribeId}`,
    method,
    reactQueryOptions: {
      enabled: !!subscribeId,
    },
  });

  return { errorAction: data, ...rest };
}
