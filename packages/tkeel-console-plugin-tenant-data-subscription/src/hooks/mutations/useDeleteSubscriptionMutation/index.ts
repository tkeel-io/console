import { usePluginMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteSubscriptionMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/core-broker/v1/subscribe/${id}`;

  return usePluginMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
