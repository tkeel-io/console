import { usePluginMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/rudder/v1/plugins';
const method = 'POST';

type RequestData = {
  extra?: string;
  desc?: string;
};

type Props = {
  pluginName: string;
  onSuccess: (
    data: RequestResult<unknown, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useEnablePluginMutation({
  pluginName,
  onSuccess,
}: Props) {
  return usePluginMutation<unknown, undefined, RequestData>({
    url: `${url}/${pluginName}/tenants`,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
