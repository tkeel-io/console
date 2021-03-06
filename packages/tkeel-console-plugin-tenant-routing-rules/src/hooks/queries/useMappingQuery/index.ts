import { useQuery } from '@tkeel/console-hooks';

export type Tables = {
  Name: string;
  IndexGranularity: string;
};

export interface ApiData {
  '@type': string;
  tables: Tables[];
}

const url = '/rule-manager/v1/sink';
const method = 'GET';

export default function useMappingQuery(verifyId: string) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${verifyId}/tables`,
    method,
    reactQueryOptions: {
      enabled: !!verifyId,
    },
  });

  return { mappingData: data?.tables, ...rest };
}
