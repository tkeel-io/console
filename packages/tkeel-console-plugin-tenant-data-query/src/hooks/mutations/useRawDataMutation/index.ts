import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface DataItem {
  timestamp: string;
  id: string;
  entity_id: string;
  path: 'rawData';
  values: string;
}

export interface ApiData {
  '@types': string;
  total: number;
  page_num: number;
  page_size: number;
  items: DataItem[];
}

const method = 'POST';

type RequestData = {
  start_time: number;
  end_time: number;
  page_size: number;
  page_num: number;
  is_descending: boolean;
  path: 'rawData';
  filters: { mark: string };
};

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useRawDataMutation(props?: Props) {
  const { onSuccess } = props || {};
  const reactQueryOptions = onSuccess
    ? {
        onSuccess,
      }
    : {};
  return useMutation<ApiData, undefined, RequestData>({
    method,
    reactQueryOptions,
  });
}
