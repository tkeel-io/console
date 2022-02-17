import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const method = 'GET';

export interface BasicInfo {
  directConnection: boolean;
  ext: {
    [propName: string]: {
      name: string;
      value: string;
    };
  };
  parentId: string;
  selfLearn: boolean;
  description?: string;
  [propName: string]: unknown;
}

export interface SysField {
  _createdAt: number;
  _updatedAt: number;
  _id: string;
  _status: string;
  _token: string;
  [propName: string]: unknown;
}
interface DeviceObject {
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    [propName: string]: unknown;
  };
}

type RequestParams = {
  id: string;
};
export interface ApiData {
  '@type': string;
  deviceObject?: DeviceObject;
}

export default function useDeviceDetailQuery({ id }: RequestParams) {
  const url = `/tkeel-device/v1/devices/${id}`;
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
  });
  const basicInfo = data?.deviceObject?.properties?.basicInfo;
  const sysField = data?.deviceObject?.properties?.sysField;

  return { basicInfo, sysField, data, ...rest };
}
