import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  noticeId: number;
  userName: string;
  emailAddress: string;
}

interface ApiData {
  '@type': string;
}

interface Options {
  onSuccess: () => void;
}

export default function useCreateEmailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/create',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
