import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@type': string;
}

interface RequestData {
  entities: string[];
}

interface Props {
  id: string;
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void;
}

const method = 'POST';

export default function useAddSubscribeEntitiesMutation({
  id,
  onSuccess,
}: Props) {
  const url = `/core-broker/v1/subscribe/${id}/entities`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
