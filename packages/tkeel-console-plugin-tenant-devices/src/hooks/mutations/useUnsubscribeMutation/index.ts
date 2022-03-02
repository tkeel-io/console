import { usePluginMutation } from '@tkeel/console-hooks';

const method = 'POST';

export interface ApiData {
  '@type': string;
}

function useUnsubscribeMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  return usePluginMutation<ApiData, undefined>({
    url: `/core-broker/v1/subscribe/${id}/entities/delete`,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useUnsubscribeMutation;
