import { RequestResult } from '@tkeel/console-utils';

import useMutation from '@/tkeel-console-plugin-tenant-plugins/hooks/useMutation';

const url = '/rudder/v1/plugins';
const method = 'DELETE';

type Props = {
  pluginName: string;
  onSuccess: (
    data: RequestResult<unknown, undefined, undefined>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useDisablePluginMutation({
  pluginName,
  onSuccess,
}: Props) {
  return useMutation({
    url: `${url}/${pluginName}/tenants`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
