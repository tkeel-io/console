import { useQuery } from '@tkeel/console-hooks';

const method = 'GET';
export interface ApiData {
  '@type': string;
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

export default function useTelemetryDetailQuery(uid: string, id: string) {
  const url = `/tkeel-device/v1/templates/${uid}/telemetry/${id}`;
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
  });
  return { data: data as ApiData, ...rest };
}
