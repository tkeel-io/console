import { useQuery } from '@tkeel/console-hooks';

type ApiData = { noticeId: number; count: number }[];

export default function useMailCountsQuery() {
  const result = useQuery<ApiData>({
    url: '/tkeel-alarm/v1/alarm/email/queryCount',
    method: 'GET',
  });
  const counts = result?.data ?? [];
  return { ...result, counts };
}
