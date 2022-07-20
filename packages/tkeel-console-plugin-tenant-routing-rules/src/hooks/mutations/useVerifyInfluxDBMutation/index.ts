import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

interface RequestData {
  urls: string;
  meta: {
    org: string;
    bucket: string;
    token: string;
  };
}

export interface ApiData {
  '@type': string;
  id: string;
}

const method = 'POST';
const url = '/rule-manager/v1/verify/influxdb';

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
  onError: (
    error: unknown,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useVerifyInfluxDBMutation({
  onSuccess,
  onError,
}: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    extras: {
      handleApiError: false,
    },
    reactQueryOptions: {
      onSuccess,
      onError,
    },
  });
}
