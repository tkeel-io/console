import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  name: string;
  type: number;
  desc: string;
}

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useCreateRulesMutation({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) {
  const url = `/rule-manager/v1/rules`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
