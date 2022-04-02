import {
  AttributeItem,
  AttributeValue,
  TelemetryItem,
  TelemetryValue,
} from '@tkeel/console-types';

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
    telemetry: TelemetryValue;
    attributes: AttributeValue;
    connectInfo: ConnectInfo;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
}
