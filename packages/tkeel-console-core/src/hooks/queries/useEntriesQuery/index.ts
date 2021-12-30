import useQuery from '@/hooks/useQuery';

const url = '/rudder/v1/entries';
const method = 'GET';

export interface Entry {
  id: string;
  name: string;
  icon?: string;
  path?: string;
  entry?: string | { scripts?: string[]; styles?: string[]; html?: string };
  children?: Entry[];
}

export interface ApiData {
  '@type': string;
  entries: Entry[];
}

export default function useEntriesQuery() {
  const { data, ...rest } = useQuery<ApiData>({ url, method });
  const entries = data?.entries || [];

  if (process.env.NODE_ENV === 'development') {
    return {
      entries: [
        ...entries,
        {
          id: 'plugin-example',
          name: 'example',
          icon: 'HumanVipFilledIcon',
          path: '/example',
          entry: 'http://127.0.0.1:3002',
        },
      ],
      data,
      ...rest,
    };
  }

  return { entries, data, ...rest };
}
