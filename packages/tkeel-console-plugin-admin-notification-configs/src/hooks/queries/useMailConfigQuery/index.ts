import { useQuery } from '@tkeel/console-hooks';

import { MailFormField } from '@/tkeel-console-plugin-admin-notification-configs/types';

const url = '/tkeel-alarm/v1/alarm/mailConfig/query';
const method = 'GET';

type ApiData = Required<MailFormField> | null;

export default function useMailConfigQuery() {
  const { data, ...rest } = useQuery<ApiData, undefined, undefined>({
    url,
    method,
  });
  return { data, ...rest };
}
