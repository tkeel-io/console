import { RequestResult } from '@tkeel/console-utils';

import useMutation from '@/tkeel-console-plugin-admin-plugins/hooks/useMutation';

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
  return useMutation<ApiData, undefined, RequestData>({
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
