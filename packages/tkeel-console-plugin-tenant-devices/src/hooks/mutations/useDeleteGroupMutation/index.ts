import useMutation from '@/tkeel-console-plugin-tenant-devices/hooks/useMutation';

const url = '/tkeel-device/v1/groups/delete';
const method = 'POST';

export interface ApiData {
  '@type': string;
}
export interface RequestData {
  ids: string[];
}

function useDeleteGroupMutation({
  ids,
  onSuccess,
}: {
  ids: string[];
  onSuccess?: () => void;
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
