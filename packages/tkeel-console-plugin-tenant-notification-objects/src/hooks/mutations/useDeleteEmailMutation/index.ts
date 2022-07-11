import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  id: number;
  deleted: 1;
}

interface ApiData {
  '@type': string;
}

interface Options {
  onSuccess: () => void;
}

export default function useDeleteEmailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/update',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
