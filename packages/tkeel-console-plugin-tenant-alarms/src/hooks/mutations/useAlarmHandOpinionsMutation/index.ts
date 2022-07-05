import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

const method = 'PUT';

type RequestData = {
  ruleId: number;
  alarmId: number;
  handOpinions: string;
};

export default function useHandOpinionsMutation({
  onSuccess,
}: {
  onSuccess: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/alarm/handle',
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
