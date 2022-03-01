import { usePluginQuery } from '@tkeel/console-hooks';

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
  key?: string;
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
export interface DeviceObject {
  id: string;
  properties: {
    basicInfo?: BasicInfo;
    sysField?: SysField;
    rawData?: RawData;
    connectInfo?: ConnectInfo;
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
  const { data, ...rest } = usePluginQuery<ApiData, RequestParams>({
    url,
    method,
  });
  const deviceObject = data?.deviceObject;

  return { deviceObject, ...rest };
}
