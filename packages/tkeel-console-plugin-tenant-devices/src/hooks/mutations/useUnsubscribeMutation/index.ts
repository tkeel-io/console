import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

export interface ApiData {
  '@type': string;
}

type RequestData = {
  entities: string[];
};

function useUnsubscribeMutation({
  subscribeId,
  onSuccess,
}: {
  subscribeId: string;
  onSuccess?: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url: `/core-broker/v1/subscribe/${subscribeId}/entities/delete`,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useUnsubscribeMutation;
