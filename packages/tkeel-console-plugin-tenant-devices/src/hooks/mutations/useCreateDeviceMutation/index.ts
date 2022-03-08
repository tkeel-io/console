import { useMutation } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/devices';
const method = 'POST';

export interface DeviceInfoType {
  '@type': string;
  id: string;
  owner: string;
  source: string;
  type: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
      directConnection: boolean;
      parentId: string;
      [propName: string]: any;
    };
    sysField: {
      _createdAt: number;
      _token: string;
      [propName: string]: any;
    };
  };
}
export interface ApiData {
  '@type': string;
  deviceObject: DeviceInfoType;
}
export interface RequestData {
  description?: string;
  name: string;
  directConnection: boolean;
  selfLearn: boolean;
  templateId?: string;
  parentId?: string;
  ext: {
    [propName: string]: unknown;
  };
}

export default function useCreateDeviceMutation({
  onSuccess,
}: {
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
