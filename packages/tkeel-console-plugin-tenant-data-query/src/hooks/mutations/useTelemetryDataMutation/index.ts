import { usePluginMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@types': string;
  total: number;
  page_num: number;
  page_size: number;
  items: {
    time: string;
    value: {
      [propName: string]: unknown;
    };
  }[];
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
  return usePluginMutation<ApiData, undefined, RequestData>({
    method,
  });
}
