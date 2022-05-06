import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface DataItem {
  time: string;
  value: {
    [propName: string]: unknown;
  };
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
  identifiers: string;
  page_size: number;
  page_num: number;
};

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useTelemetryDataMutation(props?: Props) {
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
