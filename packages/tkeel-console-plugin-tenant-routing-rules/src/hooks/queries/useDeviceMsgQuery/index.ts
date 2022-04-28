import { values } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { TelemetryItem } from '@tkeel/console-types';

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

const url = '/tkeel-device/v1/templates';
const method = 'GET';

export default function useDeviceMsgQuery(
  templateId: string,
  isRequest: boolean
) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${templateId}/telemetry`,
    method,
    reactQueryOptions: {
      enabled: isRequest,
    },
  });
  const deviceMsgList =
    values(data?.templateTeleObject?.configs?.telemetry?.define?.fields) || [];
  return { deviceMsgList, data, ...rest };
}
