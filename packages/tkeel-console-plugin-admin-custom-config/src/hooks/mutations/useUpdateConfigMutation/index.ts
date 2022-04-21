import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
}

const url = '/rudder/v1/config/platform/update';
const method = 'POST';

type RequestData = {
  extra: string;
};

type Props = {
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useUpdateConfigMutation(props?: Props) {
  const onSuccess = props?.onSuccess;
  const reactQueryOptions = onSuccess
    ? {
        onSuccess,
      }
    : {};
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions,
  });
}
