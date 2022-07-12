import { useMutation } from '@tkeel/console-hooks';
import type { AlarmMail } from '@tkeel/console-request-hooks';

type RequestData = Omit<AlarmMail, 'id'>;

type ApiData = number;

interface Options {
  onSuccess: () => void;
}

export default function useCreateMailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/create',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
