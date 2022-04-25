import { useQuery } from '@tkeel/console-hooks';

const method = 'POST';
const url = '/core-broker/v1/subscribe/list';

export type SubscribeInfo = {
  description: string;
  endpoint: string;
  id: string;
  title: string;
  is_default: boolean;
};

interface ApiData {
  '@type': string;
  data: SubscribeInfo[];
}

type RequestData = {
  page_num: number;
  page_size: number;
  key_words: string;
};

const defaultProps = {
  pageNum: 1,
  pageSize: 20,
  keywords: '',
};

type Props = {
  pageNum?: number;
  pageSize?: number;
  keywords?: string;
};

export default function useSubscribeListQuery(props?: Props) {
  const { pageNum, pageSize, keywords } = { ...defaultProps, ...props };
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: {
      page_num: pageNum,
      page_size: pageSize,
      key_words: keywords,
    },
  });

  const subscribeList = data?.data ?? [];
  return { subscribeList, ...rest };
}
