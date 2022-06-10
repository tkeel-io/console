import { useMutation } from '@tkeel/console-hooks';
import {
  AlarmLevel,
  AlarmRuleType,
  AlarmSourceObject,
  AlarmType,
} from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

export interface ApiData {
  '@types': string;
  value: object;
}

const method = 'POST';

export enum Time {
  Immediate,
  OneMinute,
  ThreeMinutes,
  FiveMinutes,
}

export enum Polymerize {
  Avg = 'avg',
  Max = 'max',
  Min = 'min',
}

export enum Operator {
  Eq = 'eq',
  Ne = 'ne',
  Gt = 'gt',
  Lt = 'lt',
  Ge = 'ge',
  Le = 'le',
}

export enum TelemetryType {
  Enum,
  Bool,
  Common,
}

interface DeviceConditionItem {
  telemetryId: string;
  telemetryName: string;
  telemetryType: TelemetryType;
  time?: Time;
  polymerize?: Polymerize;
  operator: Operator;
  value?: string;
}

export enum Condition {
  Or = 'or',
  And = 'and',
}

export interface RequestData {
  ruleName: string;
  alarmType: AlarmType;
  alarmRuleType: AlarmRuleType;
  alarmLevel: AlarmLevel;
  alarmSourceObject: AlarmSourceObject;
  deviceId?: string;
  deviceName?: string;
  platformAlarmRule?: Record<string, string>;
  deviceCondition?: DeviceConditionItem[];
  condition: Condition;
}

interface Props {
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useCreatePolicyMutation({ onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    url: '/tkeel-alarm/v1/rule/create',
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
