import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const method = 'GET';
export interface BasicInfo {
  configs?: object;
  mappers?: object;
  owner?: string;
  source?: string;
  directConnection: boolean;
  templateId: string;
  templateName: string;
  parentName: string;
  name: string;
  type: string;
  ext: {
    [propName: string]: {
      value: string;
      name: string;
    };
  };
  parentId: string;
  selfLearn: boolean;
  description?: string;
}

export interface RawData {
  id: string;
  mark: 'upstream' | 'downstream' | 'connecting';
  path: string;
  ts: number;
  type: string;
  values: string;
}
export interface ConnectInfo {
  _clientId: string;
  _online: boolean;
  _owner: string;
  _peerHost: string;
  _protocol: string;
  _sockPort: string;
  _userName: string;
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
}
interface DeviceObject {
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    rawData?: RawData;
    connectInfo?: ConnectInfo;
  };
}

type RequestParams = {
  id: string;
};
export interface ApiData {
  '@type': string;
  deviceObject: DeviceObject;
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
  const rawData = properties?.rawData;
  const connectInfo = properties?.connectInfo;

  return { basicInfo, sysField, rawData, connectInfo, ...rest };
}
