import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

const method = 'DELETE';

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useDeleteTargetMutation({ onSuccess }: Props) {
  return useMutation<ApiData>({
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
