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

type RequestData = {
  ruleId: string;
  ruleName: string;
  alarmType: AlarmType;
  alarmRuleType: AlarmRuleType;
  alarmLevel: AlarmLevel;
  alarmSourceObject: AlarmSourceObject;
  deviceId: string;
  deviceName: string;
  telemetryId: string;
  // platformAlarmRule;
  // deviceCondition;
  condition: 'or' | 'and'; // 条件 or | and
  telemetryType: 0 | 1 | 2; // 0：枚举；1：布尔；2：普通
};

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, RequestData>,
    variables: unknown,
    context: unknown
  ) => void | Promise<unknown>;
};

export default function useCreatePolicyMutation({ onSuccess }: Props) {
  return useMutation<ApiData, undefined, RequestData>({
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
}
