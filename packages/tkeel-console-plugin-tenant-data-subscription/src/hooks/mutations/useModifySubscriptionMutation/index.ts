import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@type': string;
}

type Props = {
  id: string;
  onSuccess?: () => void;
};

const method = 'PATCH';

interface RequestData {
  title: string;
  id: number;
  description: string;
}

export default function useCreateSubscribeMutation({ onSuccess, id }: Props) {
  const url = `/core-broker/v1/subscribe/${id}`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
