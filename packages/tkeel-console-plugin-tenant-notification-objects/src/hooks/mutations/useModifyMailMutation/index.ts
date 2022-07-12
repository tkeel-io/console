import { useMutation } from '@tkeel/console-hooks';

import type { Mail } from '@/tkeel-console-plugin-tenant-notification-objects/types/mail';

interface RequestData extends Omit<Mail, 'noticeId'> {
  deleted?: 0 | 1;
}

interface ApiData {
  '@type': string;
}

interface Options {
  onSuccess: () => void;
}

export default function useModifyMailMutation({ onSuccess }: Options) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/email/update',
    method: 'PUT',
    reactQueryOptions: { onSuccess },
  });
}
