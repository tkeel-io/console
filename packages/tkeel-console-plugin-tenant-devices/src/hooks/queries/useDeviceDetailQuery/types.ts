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
  _timestamp?: number | string;
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

export interface Attributes {
  [propName: string]: {
    define: {
      default_value: string;
      rw: 'r' | 'w' | 'rw';
    };
    description: string;
    id: string;
    name: string;
    type: string;
  };
}

export interface DeviceObject {
  id: string;
  configs: {
    attributes?: Attributes;
  };
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    rawData: RawData;
    connectInfo: ConnectInfo;
  };
}
