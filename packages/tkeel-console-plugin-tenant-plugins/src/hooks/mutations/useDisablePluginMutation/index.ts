import { usePluginMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

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
  return usePluginMutation({
    url: `${url}/${pluginName}/tenants`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
