import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  name?: string;
  client?: {
    name?: string;
    status?: string;
  };
}

interface Client {
  id: string;
  status: 'enabled' | 'disabled';
  token: string;
}
export interface ApiData {
  '@type': string;
  client: Client;
  command: string;
}

const method = 'PUT';

export default function useModifyNetworkMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: ({ data }: { data: ApiData }) => void;
}) {
  const url = `/fluxswitch/v1/client/${id}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
