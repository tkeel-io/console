import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

interface ApiData {
  '@type': string;
}

interface RequestData {
  subscribe_ids: number[];
}

type Props = {
  deviceId: string;
  onSuccess?: () => void;
};

function useSubscribeByDeviceMutation({ deviceId, onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `/core-broker/v1/subscribe/device/${deviceId}`,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useSubscribeByDeviceMutation;
