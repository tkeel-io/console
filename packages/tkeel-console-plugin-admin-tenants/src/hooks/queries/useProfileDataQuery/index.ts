import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  tenant_id: string;
}

interface AipData {
  '@type': string;
  profiles: {
    [key: string]: number | string;
  };
}

interface Options {
  params: RequestParams;
}

export default function useProfileDataQuery({ params }: Options) {
  const result = useQuery<AipData, RequestParams>({
    url: '/rudder/v1/profile/data',
    method: 'GET',
    params,
  });
  const dataValues = result?.data?.profiles;

  return { ...result, dataValues };
}
