import { useMutation } from '@tkeel/console-hooks';

const url = '/tkeel-device/v1/templates';
const method = 'POST';

export interface ApiData {
  details?: unknown;
}
interface RequestData {
  desc: string;
  name: string;
}

export default function useCreateTemplateMutation() {
  return useMutation<ApiData, undefined, RequestData>({ url, method });
}
