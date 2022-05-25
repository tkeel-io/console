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
  token: string;
}

interface ApiData {
  '@type': string;
  client: Client;
  command: string;
}

const method = 'POST';

export default function useCreateNetworkMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const url = `/fluxswitch/v1/client`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
