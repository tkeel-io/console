import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

import { ExpressionItem } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

const method = 'POST';

export interface ApiData {
  '@type': string;
}

export interface RequestData {
  expressions: ExpressionItem[];
}

function useCreateDeviceRelationMutation({
  uid,
  onSuccess,
}: {
  uid: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/devices/${uid}/relation`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useCreateDeviceRelationMutation;
