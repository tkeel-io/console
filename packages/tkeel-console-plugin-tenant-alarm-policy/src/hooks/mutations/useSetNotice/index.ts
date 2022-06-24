import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

export interface RequestData {
  ruleId: number;
  noticeId: string;
}

interface Props {
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useSetNotice({ onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/rule/setNotice',
    method: 'PUT',
    reactQueryOptions: {
      onSuccess,
    },
  });
}
