import { useMutation } from '@tkeel/console-hooks';

export interface RequestData {
  ids: string[];
  source: 'temp' | 'device';
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess: () => void;
  uid: string;
};

const method = 'post';

export default function useDeleteTelemetryMutation({ onSuccess, uid }: Props) {
  const url = `/tkeel-device/v1/templates/${uid}/telemetry/delete`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
