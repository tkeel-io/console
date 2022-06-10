import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  tenantId?: string;
  noticeId?: number;
  groupName?: string;
  noticeDesc?: string;
  emailAddress?: string;
}

interface Client {
  id: string;
  token: string;
}

interface ApiData {
  '@type': string;
  client: Client;
  command: string;
}

const method = 'POST';

export default function useCreateNotificationMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const url = `/tkeel-alarm/v1/alarm/noticeGroup/add`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
