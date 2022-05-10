import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name: string;
  ip: string;
  port: string;
  agree: string;
  remark: string;
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
  const url = `/rule-manager/v1/rules`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
