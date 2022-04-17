import { useQuery } from '@tkeel/console-hooks';

export type Tables = {
  name: string;
  type: string;
};

export interface ApiData {
  '@type': string;
  table_fields: Tables[];
}

const url = '/rule-manager/v1/sink';
const method = 'GET';

export default function useRelationTableQuery(
  verifyId: string,
  selName: string
) {
  const { data, ...rest } = useQuery<ApiData>({
    url: `${url}/${verifyId}/maps?table_name=${selName}`,
    method,
    reactQueryOptions: {
      enabled: !!selName,
    },
  });

  return { fieldsData: data?.table_fields || [], ...rest };
}
