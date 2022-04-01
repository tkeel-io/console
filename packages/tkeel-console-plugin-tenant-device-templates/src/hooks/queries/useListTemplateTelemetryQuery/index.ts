import { values } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
  id?: string;
};

export interface TelemetryItem {
  name: string;
  id: string;
  type: string;
  description: string;
  last_time: number;
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
}
export interface Telemetry {
  [propName: string]: TelemetryItem;
}
export interface ApiData {
  '@type': string;
  templateTeleObject: {
    configs?: {
      telemetry?: {
        define?: {
          fields?: Telemetry;
        };
      };
    };
  };
}

export default function useListTemplateTelemetryQuery({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestParams>
  ) => unknown;
}) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry`;

  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });

  const telemetryList =
    values(data?.templateTeleObject?.configs?.telemetry?.define?.fields) || [];
  return { telemetryList, data, ...rest };
}
