import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  tenantId?: string;
  noticeId?: number;
  groupName?: string;
  noticeDesc?: string;
  emailAddress?: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

export default function useOperationMailMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const url = `/tkeel-alarm/v1/alarm/noticeGroup/update`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
