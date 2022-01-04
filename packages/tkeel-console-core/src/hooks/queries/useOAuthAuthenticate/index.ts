import useQuery from '@/tkeel-console-core/hooks/useQuery';

const url = '/security/v1/oauth/authenticate';
const method = 'GET';

export interface ApiData {
  [key: string]: unknown;
}

export default function useOAuthAuthenticate() {
  return useQuery<ApiData>({ url, method });
}
