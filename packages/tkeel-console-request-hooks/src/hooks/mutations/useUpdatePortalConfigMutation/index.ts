import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface Props<RequestData> {
  key?: string;
  path: string;
  onSuccess?: (
    data: RequestResult<unknown, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

const url = '/rudder/v1/config/platform';

export default function useUpdatePortalConfigMutation<RequestData>({
  key = 'appearance',
  path,
  onSuccess,
}: Props<RequestData>) {
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  return useMutation<unknown, undefined, RequestData>({
    url: `${url}?key=${key}&path=${path}`,
    method: 'POST',
    reactQueryOptions,
  });
}
