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

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateProxyMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const url = `/fluxswitch/v1/proxy`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
