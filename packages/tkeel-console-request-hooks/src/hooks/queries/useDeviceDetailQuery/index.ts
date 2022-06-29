import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

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

export interface Properties {
  basicInfo?: BasicInfo;
  sysField?: SysField;
  rawData?: RawData;
  connectInfo?: ConnectInfo;
}

export enum TelemetryType {
  Int = 'int',
  Float = 'float',
  Double = 'double',
  Bool = 'bool',
  Enum = 'enum',
}

interface TelemetryField {
  define: Record<string, unknown>;
  description: string;
  enabled: boolean;
  enabled_search: boolean;
  enabled_time_series: boolean;
  id: string;
  last_time: number;
  name: string;
  type: TelemetryType;
}

export interface TelemetryFields {
  [propName: string]: TelemetryField;
}

export interface DeviceObject {
  id: string;
  configs: {
    telemetry: {
      define: {
        fields: TelemetryFields;
      };
    };
  };
  properties: Properties;
}

interface ApiData {
  '@type': string;
  deviceObject?: DeviceObject;
}

type Props = {
  id: string;
  onSuccess?: (data: RequestResult<ApiData, undefined, undefined>) => void;
};

export default function useDeviceDetailQuery({ id, onSuccess }: Props) {
  const url = `/tkeel-device/v1/devices/${id}`;
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method: 'GET',
    reactQueryOptions: {
      enabled: !!id,
      onSuccess,
    },
  });

  const deviceObject = data?.deviceObject;

  return { deviceObject, ...rest };
}
