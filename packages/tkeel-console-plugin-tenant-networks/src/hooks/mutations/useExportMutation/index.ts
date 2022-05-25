import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface ApiData {
  '@type': string;
  content: string;
}

const method = 'GET';

export default function useExportMutation({
  onSuccess,
}: {
  onSuccess: (data: RequestResult<ApiData, undefined, undefined>) => void;
}) {
  const url = `/fluxswitch/v1/template`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
