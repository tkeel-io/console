// TODO: temp

import { useMutation } from '@tkeel/console-hooks';

type RequestData = {
  extra: string;
};

export interface ApiData {
  '@type': string;
}

const method = 'POST';

export default function useGetResetPasswordKeyMutation() {
  const url = `/rudder/v1/config/platform/update`;

  return useMutation<ApiData, undefined, RequestData>({ url, method });
}
