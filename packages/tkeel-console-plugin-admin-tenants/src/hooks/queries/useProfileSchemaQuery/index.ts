import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  profile: string;
}

interface AipData {
  '@type': string;
  config: string;
}

interface Options {
  params: RequestParams;
}

export default function useProfileSchemaQuery({ params }: Options) {
  return useQuery<AipData, RequestParams>({
    url: '/rudder/v1/profile/schema',
    method: 'GET',
    params,
  });
}
