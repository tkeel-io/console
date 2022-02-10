import useMutation from '@/tkeel-console-plugin-tenant-devices/hooks/useMutation';

const url = '/tkeel-device/v1/groups';
const method = 'POST';

export interface ApiData {
  details?: unknown;
}
export interface RequestData {
  desc: string;
  name: string;
  parent: string;
  ext: {
    [propName: string]: unknown;
  };
}

export default function useCreateTemplateMutation() {
  return useMutation<ApiData, undefined, RequestData>({ url, method });
}
