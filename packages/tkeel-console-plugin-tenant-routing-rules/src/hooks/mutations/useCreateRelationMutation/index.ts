import { useMutation } from '@tkeel/console-hooks';

type Field = { name: string; type: string };

type Fields = { tfield_name: string; m_field: Field };

// type MysqlRequest = {
//   sink_type: string;
//   sink_id: string;
//   table_name: string;
//   fields: Fields[];
// };
// export interface RequestData {
//   mysqlrequest: MysqlRequest;
// }
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
