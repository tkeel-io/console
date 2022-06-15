import { useMutation } from '@tkeel/console-hooks';

import { MailFormField } from '@/tkeel-console-plugin-admin-notification-configs/types';

const url = '/tkeel-alarm/v1/alarm/mailConfig';
const method = 'POST';

type RequestData = MailFormField;

export default function useOperateMailConfigMutation({
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
