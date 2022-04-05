import { useMutation } from '@tkeel/console-hooks';

export interface TelemetryFormFields {
  name: string;
  id: string;
  type: string;
  description: string;
  last_time?: number;
  define: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
}

export interface RequestData {
  [propName: string]: TelemetryFormFields;
}

export interface ApiData {
  '@type': string;
}

type Props = {
  onSuccess?: () => void;
  uid: string;
};

const method = 'POST';

export default function useCreateTelemetryMutation({ onSuccess, uid }: Props) {
  const url = `/tkeel-device/v1/templates/${uid}/telemetry`;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
