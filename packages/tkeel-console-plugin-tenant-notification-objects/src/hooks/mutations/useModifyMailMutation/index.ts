import { useMutation } from '@tkeel/console-hooks';
import type { AlarmMail } from '@tkeel/console-request-hooks';

interface RequestData extends Omit<AlarmMail, 'noticeId'> {
  deleted?: 0 | 1;
}

type ApiData = number;

interface Options {
  onSuccess: () => void;
}

export default function useModifyMailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/update',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
