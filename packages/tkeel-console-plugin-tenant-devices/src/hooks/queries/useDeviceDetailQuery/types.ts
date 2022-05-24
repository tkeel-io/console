import { RawDataConnectType } from '@tkeel/console-business-components';
import {
  AttributeItem,
  AttributeValue,
  CommandItem,
  CommandValue,
  TelemetryItem,
  TelemetryValue,
} from '@tkeel/console-types';

export interface ExtBusinessBaseValue {
  title: string;
  type: string;
  icon: string;
  description: string;
  value: string;
}
export type FluxSwitchValue = ExtBusinessBaseValue;

export interface ExtBusinessExtendValue extends ExtBusinessBaseValue {
  [propName: string]: unknown;
}

export interface ExtBusinessItem {
  title: string;
  type: string;
  value: ExtBusinessBaseValue[];
}

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
  ext: { [propName: string]: string };
  extBusiness: {
    [propName: string]: {
      title: string;
      type: string;
      value: ExtBusinessExtendValue[];
    };
  };
  parentId: string;
  selfLearn: boolean;
  description?: string;
}

export interface RawData {
  id: string;
  mark: RawDataConnectType;
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
    attributes?: {
      define?: { fields?: { [propName: string]: AttributeItem } };
    };
    telemetry?: { define?: { fields?: { [propName: string]: TelemetryItem } } };
    commands?: { define?: { fields?: { [propName: string]: CommandItem } } };
  };
  properties: {
    basicInfo: BasicInfo;
    sysField: SysField;
    rawData: RawData;
    telemetry: TelemetryValue;
    attributes: AttributeValue;
    connectInfo: ConnectInfo;
    commands: CommandValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propName: string]: any;
  };
}
