import { useMutation } from '@tkeel/console-hooks';

const url = '/security/v1/tenants';
const method = 'POST';

interface RequestData {
  profiles: {
    [propName: string]: string;
  };
}

export interface ApiData {
  '@type': string;
}

export default function useProfileDataMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
