import { useMutation } from '@tkeel/console-hooks';

import { MailFormField } from '@/tkeel-console-plugin-admin-notification-configs/types';

const url = '/tkeel-alarm/v1/alarm/email/test';
const method = 'POST';

interface RequestData extends MailFormField {
  to: string;
}

export default function useEmailTestMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  return useMutation<undefined, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
