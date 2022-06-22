export type AlarmLevel = 1 | 2 | 3 | 4;

export type AlarmPolicyType = 0 | 1;

export type AlarmType = 0 | 1;

export type AlarmSource = 0 | 1;

export type AlarmStatus = 0 | 1;

export interface RequestParams {
  pageSize: number;
  pageNum: number;
  alarmLevel?: AlarmLevel;
  alarmType?: AlarmType;
  alarmStrategy?: AlarmPolicyType;
  alarmSource?: AlarmSource;
  startTime?: number;
  endTime?: number;
}

export interface AlarmItem {
  alarmDesc: string;
  alarmId: number;
  alarmLevel: AlarmLevel;
  alarmName: string;
  alarmSource: AlarmSource;
  alarmStatus: AlarmStatus;
  alarmStrategy: AlarmPolicyType;
  alarmType: AlarmType;
  startTime: number;
  objectId: string;
  ruleId: number;
  alarmValue: string;
  deviceId?: string | null;
  // deleted: 0
  // handOpinions: null
  // handTime: null
  // telemetryId: "202071003"
  // tenantId: "ZQ8mV0rk"
}

export interface AlarmDetail {
  alarmLevel: AlarmLevel;
  alarmRuleType: AlarmPolicyType;
  alarmSourceObject: AlarmSource;
  alarmType: AlarmType;
  createTime: string;
  deviceId?: string | null;
  deviceName?: string | null;
  // enable: 0;
  noticeId: string;
  promQl: string;
  ruleDesc: string;
  ruleId: number;
  ruleName: string;
}

export interface AlarmNotice {
  noticeId: string;
  groupName: string;
  noticeDesc: string;
  emailAddress: string;
}
export type AlarmDetailType = Partial<AlarmItem & AlarmDetail>;
