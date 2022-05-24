import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name?: string;
  host?: string;
  port?: string;
  protocol?: string;
  remark?: string;
  client_id?: number;
  device_id?: string;
  device_name?: string;
  status?: string;
}

interface Proxy {
  status: string;
}

export interface ApiData {
  '@type': string;
  proxy: Proxy;
}

const method = 'PUT';

export default function useModifyProxyMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: ({ data }: { data: ApiData }) => void;
}) {
  const url = `/fluxswitch/v1/proxy/${id}`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
