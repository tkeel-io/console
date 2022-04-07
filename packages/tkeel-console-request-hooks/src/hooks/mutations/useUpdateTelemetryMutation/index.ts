import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

import { TelemetryFormFields as RequestData } from '../useCreateTelemetryMutation';

export interface ApiData {
  '@type': string;
  templateObject: {
    id: string;
  };
}

type Props = {
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
  id: string;
};

const method = 'PUT';

export default function useUpdateTelemetryMutation({ onSuccess, id }: Props) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry `;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
