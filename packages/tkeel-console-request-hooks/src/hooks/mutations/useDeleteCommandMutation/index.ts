import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  ids: string[];
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess: () => void;
  uid: string;
};

const method = 'post';

export default function useDeleteCommandMutation({ onSuccess, uid }: Props) {
  const url = `/tkeel-device/v1/templates/${uid}/command/delete`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
