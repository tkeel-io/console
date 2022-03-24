import { useQuery } from '@tkeel/console-hooks';

const method = 'GET';

export interface UsefulData {
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
  description: string;
  enabled?: boolean;
  enabled_search?: boolean;
  enabled_time_series?: boolean;
  id: string;
  last_time: number;
  name: string;
  type: string;
  weight?: number;
}
export interface ApiData {
  '@type': string;
  templateTeleSingleObject: {
    configs: {
      [propName: string]: UsefulData;
    };
  };

  templateObject: {
    id: string;
    properties: {
      basicInfo: {
        name: string;
        description: string;
      };
      sysField: {
        _updatedAt: number;
      };
    };
  };
}

type RequestData = {
  uid: string;
  id: string;
};

function handleUsefulData(data: ApiData) {
  if (data) {
    return Object.values(data?.templateTeleSingleObject?.configs)[0];
  }
  return null;
}

export default function useTelemetryDetailQuery(uid: string, id: string) {
  const url = `/tkeel-device/v1/templates/${uid}/telemetry/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
  });
  const usefulData = handleUsefulData(data as ApiData);

  return { data: data as ApiData, usefulData, ...rest };
}
