import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  ids: string[];
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess: () => void;
  id:string
};

const method = 'post';

export default function useDeleteTelemetryMutation({ onSuccess,id }: Props) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry/delete`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
