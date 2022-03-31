import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface RequestParams {
  host: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'GET';
const url = '/rule-manager/v1/testing/kafka';

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, RequestParams, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
  onError: (
    error: unknown,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useVerifyKafkaMutation({ onSuccess, onError }: Props) {
  return useMutation<ApiData, RequestParams>({
    url,
    method,
    extras: {
      handleApiError: false,
    },
    reactQueryOptions: {
      onSuccess,
      onError,
    },
  });
}
