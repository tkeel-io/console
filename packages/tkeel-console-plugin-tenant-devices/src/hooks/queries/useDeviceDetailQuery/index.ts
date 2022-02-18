import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const method = 'GET';

interface Ext {
  name: string;
  value: string;
}
export interface BasicInfo {
  configs?: object;
  mappers?: object;
  owner: string;
  source: string;
  directConnection: boolean;
  templateId: string;
  name: string;
  type: string;
  ext: {
    company: Ext;
    location: Ext;
  };
  parentId: string;
  selfLearn: boolean;
  description?: string;
}

export interface SysField {
  _createdAt: number;
  _updatedAt: number;
  _enable: boolean;
  _id: string;
  _status: string;
  _token: string;
  _owner: string;
  _source: string;
  _spacePath: string;
  _subscribeAddr: string;
  _subscribe_addr: string;
}
interface DeviceObject {
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    attributes: {
      subscribe_addr: string;
    };
  };
}

type RequestParams = {
  id: string;
};
export interface ApiData {
  '@type': string;
  deviceObject?: DeviceObject;
}

export default function useDeviceDetailQuery({
  id = '6aa71837-986b-4dcb-b3c0-cf458235f384',
}: RequestParams) {
  const url = `/tkeel-device/v1/devices/${id}`;
  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
  });
  const properties = data?.deviceObject?.properties;
  const basicInfo = properties?.basicInfo;
  const sysField = properties?.sysField;

  return { basicInfo, sysField, data, ...rest };
}
