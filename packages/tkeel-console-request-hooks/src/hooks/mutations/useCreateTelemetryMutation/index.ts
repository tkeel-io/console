import { useMutation } from '@tkeel/console-hooks';


export interface baseRequestData {
  id: string;
name: string;
description: string;
type: string;
define: {     
  // int
  min: string;
  max: string;
  step: string;
  unit: string;
  // array
  length: string;
  elem_type: string;
  // 


    // "":"v",
    // "unitName":"伏",
    // "step":"0.1",
    // "ext":{
    //     "alias":"EM_BI",
    //     "ratio_of_transformation":"0.001"
    // }
}    
}

export interface RequestData {
  [propName: string]:baseRequestData
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
