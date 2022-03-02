import { usePluginQuery } from '@tkeel/console-hooks';

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

type Props = {
  pageNum: number;
  pageSize: number;
  keyWords: string;
};

const url = `/core-broker/v1/subscribe/list`;

export default function useListSubscribeQuery({
  pageNum,
  pageSize,
  keyWords,
}: Props) {
  const { data, ...rest } = usePluginQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keyWords,
    },
  });
  const subscribeList = data?.data ?? [];
  return { subscribeList, ...rest };
}
