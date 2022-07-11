import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  id: number;
  userName: string;
  emailAddress: string;
  deleted?: 0 | 1;
}

interface ApiData {
  '@type': string;
}

interface Options {
  onSuccess: () => void;
}

export default function useModifyEmailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/update',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
