import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  noticeId: number;
}

interface ApiData {
  '@type': string;
}

interface Options {
  params: RequestParams;
}

export default function useEmailQuery({ params }: Options) {
  return useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/alarm/email/query',
    method: 'GET',
    params,
  });
}
