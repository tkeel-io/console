import { useQuery } from '@tkeel/console-hooks';

const method = 'GET';
export interface ApiData {
  '@type': string;
  client: {
    client_address: string;
    create_at: string;
    id: string;
    name: string;
    online: string;
    status: string;
    token: string;
  };
  command: string;
}

type RequestData = {
  id: string;
};

export default function useNetworkInfoQuery(id: string, isOpen: boolean) {
  const url = `/fluxswitch/v1/client/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: {
      enabled: !!id && isOpen,
    },
  });
  return { data: data as ApiData, ...rest };
}
