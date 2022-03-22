export type ReadWriteType = 'r' | 'w' | 'rw';

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
    [propName: string]: string;
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

export interface AttributeItem {
  define: {
    default_value: unknown;
    rw: ReadWriteType;
  };
  description: string;
  id: string;
  name: string;
  type: string;
}
export interface Attributes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export interface TelemetryItem {
  define: {
    default_value: unknown;
    rw: ReadWriteType;
  };
  description: string;
  id: string;
  name: string;
  type: string;
}

export interface Telemetry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
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

// export interface Attributes {
//   [propName: string]: {
//     define: {
//       default_value: string;
//       rw: ReadWriteType;
//     };
//     description: string;
//     id: string;
//     name: string;
//     type: string;
//   };
// }

export interface DeviceObject {
  id: string;
  configs: {
    attributes?: { define?: { fields?: AttributeItem } };
    telemetry?: { define?: { fields?: TelemetryItem } };
  };
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    rawData: RawData;
    telemetry?: Telemetry;
    attributes: Attributes;
    connectInfo: ConnectInfo;
  };
}
