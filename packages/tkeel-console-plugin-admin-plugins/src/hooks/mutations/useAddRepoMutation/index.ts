import { usePluginMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
  value: object;
}

const method = 'POST';

type RequestData = {
  url: string;
};

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useAddRepoMutation({ onSuccess }: Props) {
  return usePluginMutation<ApiData, undefined, RequestData>({
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
