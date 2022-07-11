import { useMutation } from '@tkeel/console-hooks';

import type { Email } from '@/tkeel-console-plugin-tenant-notification-objects/types/email';

interface RequestData extends Omit<Email, 'noticeId'> {
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
