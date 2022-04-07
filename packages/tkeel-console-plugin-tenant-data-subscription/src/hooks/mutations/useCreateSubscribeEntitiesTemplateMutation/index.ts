import { useMutation } from '@tkeel/console-hooks';

interface RequestData {
  models: string[];
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
  id: string;
};

const method = 'POST';

export default function useCreateSubscribeEntitiesTemplateMutation({
  onSuccess,
  id,
}: Props) {
  const url = `/core-broker/v1/subscribe/${id}/models`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
