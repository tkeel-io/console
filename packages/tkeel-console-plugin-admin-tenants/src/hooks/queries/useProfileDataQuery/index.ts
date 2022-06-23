import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  tenant_id: string;
}

interface AipData {
  '@type': string;
  config: string;
}

interface Options {
  params: RequestParams;
}

export default function useProfileDataQuery({ params }: Options) {
  return useQuery<AipData, RequestParams>({
    url: '/rudder/v1/profile/data',
    method: 'GET',
    params,
  });
}
