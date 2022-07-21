import { useMutation } from '@tkeel/console-hooks';

type Field = { name: string; type: string };

type Fields = { t_field: Field; m_field: Field };

export interface RequestData {
  sink_type: string;
  sink_id: string;
  table_name: string;
  fields: Fields[];
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateRelationMutation({
  ruleId,
  onSuccess,
}: {
  ruleId: string;
  onSuccess?: () => void;
}) {
  const url = `rule-manager/v1/rules/${ruleId}/target`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
