import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface Props<RequestData> {
  key?: string;
  path?: string;
  onSuccess?: (
    data: RequestResult<unknown, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useUpdatePortalConfigMutation<RequestData>({
  key = 'appearance',
  path,
  onSuccess,
}: Props<RequestData>) {
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  let url = `/rudder/v1/config/platform/update?key=${key}`;
  if (path) {
    url += `&path=${path}`;
  }
  return useMutation<unknown, undefined, RequestData>({
    url,
    method: 'POST',
    reactQueryOptions,
  });
}
