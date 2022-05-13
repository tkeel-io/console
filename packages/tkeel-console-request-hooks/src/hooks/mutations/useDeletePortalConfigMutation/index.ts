import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@type': string;
}

interface Props {
  key?: string;
  path: string;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useDeletePortalConfigMutation({
  key = 'appearance',
  path,
  onSuccess,
}: Props) {
  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  const url = `/rudder/v1/config/platform/update?key=${key}&path=${path}`;
  return useMutation<ApiData>({
    url,
    method: 'DELETE',
    reactQueryOptions,
  });
}
