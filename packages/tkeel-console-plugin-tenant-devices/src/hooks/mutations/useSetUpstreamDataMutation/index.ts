import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

export interface ApiData {
  '@type': string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RequestData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

function useSetUpstreamDataMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/raw/set`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useSetUpstreamDataMutation;
