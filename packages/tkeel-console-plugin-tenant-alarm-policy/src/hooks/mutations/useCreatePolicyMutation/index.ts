import { useMutation } from '@tkeel/console-hooks';
import {
  AlarmLevel,
  AlarmRuleType,
  AlarmSourceObject,
  AlarmType,
  Condition,
  RuleStatus,
} from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

import type { PlatformRule } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePlatformRulesQuery';

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

export enum RequestTelemetryType {
  Enum,
  Bool,
  Common,
}

interface DeviceConditionItem {
  telemetryId: string;
  telemetryName: string;
  telemetryType: RequestTelemetryType;
  time?: Time;
  polymerize?: Polymerize;
  operator: Operator;
  value?: string;
  label?: string;
}

export interface RequestData {
  ruleId?: number;
  ruleName: string;
  enable?: RuleStatus;
  alarmType: AlarmType;
  alarmRuleType: AlarmRuleType;
  alarmLevel: AlarmLevel;
  alarmSourceObject: AlarmSourceObject;
  tempId?: string;
  tempName?: string;
  deviceId?: string;
  deviceName?: string;
  platformRuleList?: PlatformRule[];
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
