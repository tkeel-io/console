import { useMutation } from '@tkeel/console-hooks';

const method = 'POST';

type ReadWriteType = 'rw' | 'r' | 'w';
export interface ApiData {
  details?: unknown;
}
export interface RequestData {
  [propName: string]: {
    name: string;
    type: string;
    id: string;
    define: {
      default_value: unknown;
      rw: ReadWriteType;
    };
  };
}

export default function useCreateAttributeMutation({
  uid,
  onSuccess,
}: {
  uid: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/templates/${uid}/attribute`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
