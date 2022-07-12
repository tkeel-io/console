import { useMutation } from '@tkeel/console-hooks';

import type { Mail } from '@/tkeel-console-plugin-tenant-notification-objects/types/mail';

type RequestData = Omit<Mail, 'id'>;

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
