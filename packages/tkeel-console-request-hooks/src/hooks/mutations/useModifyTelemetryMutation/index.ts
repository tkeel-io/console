import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';
// import {BaseRequestData as RequestData } from "../useCreateTelemetryMutation"
import { BaseRequestData as RequestData } from '@tkeel/console-request-hooks';

// export interface RequestData extends BaseRequestData;

export interface ApiData {
  '@type': string;
  templateObject: {
    id: string;
  };
}

type Props = {
  // onSuccess?: () => void;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
  id: string;
};

const method = 'PUT';

export default function useModifyTelemetryMutation({ onSuccess, id }: Props) {
  const url = `/tkeel-device/v1/templates/${id}/telemetry `;

  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
