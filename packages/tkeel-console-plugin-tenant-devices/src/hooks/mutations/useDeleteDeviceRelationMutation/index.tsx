import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'POST';

export interface ApiData {
  '@type': string;
}

export interface RequestData {
  paths: string[];
}

function useDeleteDeviceRelationMutation({
  uid,
  onSuccess,
}: {
  uid: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/devices/${uid}/relation/delete`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useDeleteDeviceRelationMutation;
