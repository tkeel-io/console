import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/groups/delete';
const method = 'POST';

export interface ApiData {
  '@type': string;
  faildDelGroup: { id: string; reason: string }[];
}
export interface RequestData {
  ids: string[];
}

function useDeleteGroupMutation({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    data: {
      ids,
    },
    reactQueryOptions: { onSuccess },
  });
}

export default useDeleteGroupMutation;
