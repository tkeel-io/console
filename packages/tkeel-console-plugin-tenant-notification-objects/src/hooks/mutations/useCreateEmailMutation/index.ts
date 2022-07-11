import { useMutation } from '@tkeel/console-hooks';

import type { Email } from '@/tkeel-console-plugin-tenant-notification-objects/types/email';

type RequestData = Omit<Email, 'id'>;

type ApiData = number;

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
