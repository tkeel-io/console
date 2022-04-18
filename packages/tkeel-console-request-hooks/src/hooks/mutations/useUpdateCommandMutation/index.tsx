import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const method = 'PUT';

export interface ApiData {
  '@type': string;
}
export interface RequestData {
  [propName: string]: {
    define: {
      fields: {
        [propName: string]: {
          [propName: string]: unknown;
        };
      };
    };
    type: string;
    id: string;
    description: string;
    name: string;
  };
}

function useUpdateCommandMutation({
  uid,
  onSuccess,
}: {
  uid: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  const url = `/tkeel-device/v1/templates/${uid}/command`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}

export default useUpdateCommandMutation;
