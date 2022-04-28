import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'POST';

interface RequestData {
  curName: string;
  direction: string;
  relationType: string;
  targetId: string;
  targetName: string;
  targetType: string;
}

interface ApiData {
  '@type': string;
}

function useCreateRelationAutoMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/devices/${id}/relation/auto`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useCreateRelationAutoMutation;
