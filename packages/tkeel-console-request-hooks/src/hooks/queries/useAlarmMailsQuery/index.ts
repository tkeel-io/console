import { useQuery } from '@tkeel/console-hooks';

interface AlarmMail {
  id: number;
  noticeId: number;
  emailAddress: string;
  userName: string;
}

type RequestParams = Pick<AlarmMail, 'noticeId'>;

type ApiData = AlarmMail[];

interface Options {
  params: RequestParams;
}

export type { AlarmMail };

export default function useAlarmMailsQuery({ params }: Options) {
  const result = useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/alarm/email/query',
    method: 'GET',
    params,
  });
  const mails = result?.data ?? [];

  return { ...result, mails };
}
