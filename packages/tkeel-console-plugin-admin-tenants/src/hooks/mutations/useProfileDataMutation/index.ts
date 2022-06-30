import { useMutation } from '@tkeel/console-hooks';

interface RequestParams {
  tenant_id: string;
}

interface RequestData {
  profiles: {
    [propName: string]: number | string;
  };
}

export interface ApiData {
  '@type': string;
}

export default function useProfileDataMutation({
  params,
  onSuccess,
}: {
  params?: RequestParams;
  onSuccess: () => void;
}) {
  return useMutation<ApiData, RequestParams, RequestData>({
    url: '/rudder/v1/profile/data',
    method: 'POST',
    params,
    reactQueryOptions: { onSuccess },
  });
}
