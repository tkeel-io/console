import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'POST';

export interface ApiData {
  '@type': string;
}
export interface RequestData {
  id: string;
  value: {
    input: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [propName: string]: any;
    };
  };
}

function useCallCommandMutation({
  uid,
  onSuccess,
}: {
  uid: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/devices/${uid}/command/set`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useCallCommandMutation;
