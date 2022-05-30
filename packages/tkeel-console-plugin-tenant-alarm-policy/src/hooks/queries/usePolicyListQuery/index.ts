import { useQuery } from '@tkeel/console-hooks';

interface ApiData {
  '@type': string;
}

export type AlarmLevel = 1 | 2 | 3 | 4;

export type AlarmRuleType = 0 | 1;

export type AlarmType = 0 | 1;

export type RuleStatus = 0 | 1;

export interface Policy {
  ruleId: number;
  alarmLevel: AlarmLevel; // 告警级别，1,2,3,4; 1级最高，4级最低
  alarmRuleType: AlarmRuleType; // 0：阈值告警；1：系统告警
  ruleName: string;
  alarmSourceObject: string;
  ruleDesc: string;
  alarmType: AlarmType; // 0：基础告警；1：持续告警
  deviceId?: string;
  deviceName?: string;
  noticeId: string;
  enable: RuleStatus; // 0：停用；1：启用
}

export default function usePolicyListQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url: '',
    method: 'GET',
  });

  return { ...rest };
}
