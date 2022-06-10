import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  noticeId: number;
  deleted: number;
}

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteNotificationMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const url = `/tkeel-alarm/v1/alarm/noticeGroup/delete`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
