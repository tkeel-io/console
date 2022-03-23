import { useMutation } from '@tkeel/console-hooks';

const method = 'PUT';
type ReadWriteType = 'r' | 'w' | 'rw';

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

export default function useEditAttributeMutation({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess?: () => void;
}) {
  const url = `/tkeel-device/v1/templates/${id}/attribute`;
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
