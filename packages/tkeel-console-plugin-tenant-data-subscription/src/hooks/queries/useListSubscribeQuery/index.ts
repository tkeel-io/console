import { useQuery } from '@tkeel/console-hooks';

const method = 'POST';
export type Data = {
  description: string;
  endpoint: string;
  id: string;
  title: string;
  is_default: boolean;
};

export interface ApiData {
  '@type': string;
  data: Data[];
}
type RequestData = {
  page_num: number;
  page_size: number;
  key_words: string;
};

export default function useListSubscribeQuery() {
  const url = `/core-broker/v1/subscribe/list`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: {
      page_num: 1,
      page_size: 20,
      key_words: '',
    },
  });
  return { data: data?.data || [], ...rest };
}
