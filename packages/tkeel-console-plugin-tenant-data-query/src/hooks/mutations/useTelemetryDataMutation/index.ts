import { useMutation } from '@tkeel/console-hooks';

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

export default function useTelemetryDataMutation() {
  return useMutation<ApiData, undefined, RequestData>({
    method,
  });
}
