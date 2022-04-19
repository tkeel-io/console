import { useQuery } from '@tkeel/console-hooks';

interface RequestParams {
  type: 'OIDC';
}

interface AipData {
  '@type': string;
  config: string;
}

interface Options {
  params: RequestParams;
}

export default function useAuthTemplateQuery({ params }: Options) {
  return useQuery<AipData, RequestParams>({
    url: '/rudder/v1/oauth/id-provider/template',
    method: 'GET',
    params,
  });
}
