import { useMutation } from '@tkeel/console-hooks';
import type { AlarmMail } from '@tkeel/console-request-hooks';

interface RequestData extends Pick<AlarmMail, 'id'> {
  deleted: 1;
}

type ApiData = number;

interface Options {
  onSuccess: () => void;
}

export default function useDeleteMailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/update',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
