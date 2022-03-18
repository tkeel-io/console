import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  id: string;
  name: string;
  description: string;
  type: string;
  // "name":"电压",
  // "description":"A相电压",
  // "type":"int",
  // "define":{        
  //     "min":"0",
  //     "max":"1000",
  //     "unit":"v",
  //     "unitName":"伏",
  //     "step":"0.1",
  //     "ext":{
  //         "alias":"EM_BI",
  //         "ratio_of_transformation":"0.001"
  //     }
  // }       
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
  id: string;
};

const method = 'POST';

export default function useCreateTelemetryMutation({
  onSuccess,
  id,
}: Props) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
