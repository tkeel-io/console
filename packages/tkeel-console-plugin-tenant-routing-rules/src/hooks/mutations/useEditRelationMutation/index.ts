import { useMutation } from '@tkeel/console-hooks';

type Field = { name: string; type: string };

type Fields = { t_field: Field; m_field: Field };

export interface RequestData {
  target_id: string;
  sink_type: string;
  sink_id: string;
  table_name: string;
  fields: Fields[];
}

export interface ApiData {
  '@type': string;
}

const method = 'PUT';

export default function useEditRelationMutation({
  verifyId,
  onSuccess,
}: {
  verifyId: string;
  onSuccess?: () => void;
}) {
  const url = `rule-manager/v1/sink/${verifyId}/maps`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
