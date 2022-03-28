import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

const method = 'DELETE';

export default function useDeleteRulesMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const url = `/rule-manager/v1/rules/${id}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
