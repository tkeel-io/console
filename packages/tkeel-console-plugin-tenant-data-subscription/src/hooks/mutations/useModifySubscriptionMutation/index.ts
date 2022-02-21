import useMutation from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useMutation';

export interface ApiData {
  '@type': string;
}

type Props = {
  id: string;
  onSuccess?: () => void;
};

const method = 'PATCH';

export default function useCreateSubscribeMutation({ onSuccess, id }: Props) {
  const url = `/core-broker/v1/subscribe/${id}`;

  return useMutation<ApiData, undefined, undefined>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
