import { usePluginMutation } from '@tkeel/console-hooks';

interface RequestData {
  groups: string[];
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
  id: string;
};

const method = 'POST';

export default function useCreateSubscribeEntitiesDeviceMutation({
  onSuccess,
  id,
}: Props) {
  const url = `/core-broker/v1/subscribe/${id}/groups`;

  return usePluginMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
