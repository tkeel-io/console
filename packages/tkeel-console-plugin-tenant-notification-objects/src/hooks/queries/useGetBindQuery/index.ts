import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

interface Props {
  noticeId: number;
  sendRequest: boolean;
}

interface TRequestParams {
  noticeId: number;
}

export default function useGetBindQuery({ noticeId, sendRequest }: Props) {
  const { data, ...rest } = useQuery<number, TRequestParams>({
    url: '/tkeel-alarm/v1/alarm/noticeGroup/binding/query',
    method: 'GET',
    params: {
      noticeId,
    },
    reactQueryOptions: {
      enabled: sendRequest && !!noticeId,
    },
  });
  const isBind = data;

  return { isBind, data, ...rest };
}
