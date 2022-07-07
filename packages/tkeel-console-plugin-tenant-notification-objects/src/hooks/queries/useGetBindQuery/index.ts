import { useQuery } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const url = '/tkeel-alarm/v1/alarm/noticeGroup/binding/query';
const method = 'GET';

interface Props {
  noticeId: number;
  sendRequest: boolean;
}

interface TRequestParams {
  noticeId: number;
}

export default function useGetBindQuery({ noticeId, sendRequest }: Props) {
  const { data, ...rest } = useQuery<number, TRequestParams>({
    url,
    method,
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
