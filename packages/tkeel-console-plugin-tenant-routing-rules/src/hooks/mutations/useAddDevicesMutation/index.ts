import { useMutation } from '@tkeel/console-hooks';

export interface ApiData {
  '@types': string;
}

const method = 'POST';

type RequestData = {
  devices_ids: string[];
};

export default function useAddDevicesMutation() {
  return useMutation<ApiData, undefined, RequestData>({
    method,
  });
}
