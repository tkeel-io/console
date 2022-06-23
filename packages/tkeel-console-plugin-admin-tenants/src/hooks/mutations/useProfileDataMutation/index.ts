import { useMutation } from '@tkeel/console-hooks';

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
    url: '/rudder/v1/profile/data',
    method: 'POST',
    reactQueryOptions: { onSuccess },
  });
}
