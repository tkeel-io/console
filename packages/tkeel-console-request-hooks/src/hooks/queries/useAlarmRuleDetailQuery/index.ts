import { useQuery } from '@tkeel/console-hooks';
import {
  AlarmLevel,
  AlarmRuleType,
  AlarmSourceObject,
  AlarmType,
  Condition,
  RuleStatus,
} from '@tkeel/console-types';

enum Status {
  Unchanged,
  Deleted,
  Modified,
}

export interface RuleDetail {
  ruleId: number;
  ruleName: string;
  ruleDesc: string;
  alarmLevel: AlarmLevel;
  alarmRuleType: AlarmRuleType;
  alarmSourceObject: AlarmSourceObject;
  alarmType: AlarmType;
  createTime: string;
  deviceId?: string | null;
  deviceName?: string | null;
  tempId?: string | null;
  tempName?: string | null;
  noticeId: string;
  enable: RuleStatus;
  condition: Condition;
  deleted: number;
  tempStatus: Status;
  deviceStatus: Status;
  telemetryStatus: Status;
}

interface RequestParams {
  ruleId: number;
}

interface Props {
  ruleId: number;
  enabled?: boolean;
}

export default function useAlarmRuleDetailQuery({ ruleId, enabled }: Props) {
  const { data, ...rest } = useQuery<RuleDetail, RequestParams>({
    params: {
      ruleId,
    },
    url: '/tkeel-alarm/v1/rule/detail',
    method: 'GET',
    reactQueryOptions: {
      enabled: !!ruleId && enabled,
    },
  });

  return { ruleDetail: data, ...rest };
}
