import { useQuery } from '@tkeel/console-hooks';
import {
  AlarmLevel,
  AlarmRuleType,
  AlarmSourceObject,
  AlarmType,
  Condition,
  RuleStatus,
} from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

export enum Status {
  Unchanged,
  Deleted,
  Modified,
}

export interface Policy {
  ruleId: number;
  ruleName: string;
  ruleDesc: string;
  alarmLevel: AlarmLevel; // 告警级别：1 2 3 4; 1级最高，4级最低
  alarmRuleType: AlarmRuleType; // 0：阈值告警；1：系统告警
  alarmSourceObject: AlarmSourceObject; // 告警源对象 0：平台；1：设备
  alarmType: AlarmType; // 0：基础告警；1：持续告警
  tempId?: string;
  tempName?: string;
  deviceId?: string | null;
  deviceName?: string | null;
  noticeId: string;
  enable: RuleStatus; // 0：停用；1：启用
  condition: Condition;
  tempStatus: Status;
  deviceStatus: Status;
  telemetryStatus: Status;
}

interface ApiData {
  '@type': string;
  total: number;
  list: Policy[];
}

export interface RequestParams {
  alarmLevel?: AlarmLevel;
  alarmRuleType?: AlarmRuleType;
  alarmType?: AlarmType;
  enable?: RuleStatus;
  ruleName?: string;
  pageNum: number;
  pageSize: number;
}

interface Props {
  params: RequestParams;
  onSuccess?: (data: RequestResult<ApiData, RequestParams, undefined>) => void;
}

export default function usePolicyListQuery({ params, onSuccess }: Props) {
  const {
    alarmLevel,
    alarmRuleType,
    alarmType,
    enable,
    ruleName,
    pageNum,
    pageSize,
  } = params;

  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url: '/tkeel-alarm/v1/rule/query',
    method: 'GET',
    params: {
      alarmLevel,
      alarmRuleType,
      alarmType,
      enable,
      ruleName,
      pageNum,
      pageSize,
    },
    reactQueryOptions: {
      onSuccess,
      queryKey: [
        'policyList',
        ruleName,
        alarmRuleType,
        alarmLevel,
        alarmType,
        enable,
        pageNum,
        pageSize,
      ],
    },
  });
  const policyList = data?.list || [];
  const total = data?.total || 0;

  return { policyList, total, ...rest };
}
