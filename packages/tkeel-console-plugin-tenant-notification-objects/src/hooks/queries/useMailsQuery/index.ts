import { useQuery } from '@tkeel/console-hooks';

import type { Mail } from '@/tkeel-console-plugin-tenant-notification-objects/types/mail';

type RequestParams = Pick<Mail, 'noticeId'>;

type ApiData = Mail[];

interface Options {
  params: RequestParams;
}

export default function useMailQuery({ params }: Options) {
  const result = useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/alarm/email/query',
    method: 'GET',
    params,
  });
  const mails = result?.data ?? [];

  return { ...result, mails };
}
