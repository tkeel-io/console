import { useQuery } from '@tkeel/console-hooks';

import type { Email } from '@/tkeel-console-plugin-tenant-notification-objects/types/email';

type RequestParams = Pick<Email, 'noticeId'>;

type ApiData = Email[];

interface Options {
  params: RequestParams;
}

export default function useEmailQuery({ params }: Options) {
  const result = useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/alarm/email/query',
    method: 'GET',
    params,
  });
  const emails = result?.data ?? [];

  return { ...result, emails };
}
