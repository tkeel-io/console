import { Policy } from '@/tkeel-console-plugin-tenant-alarm-policy/hooks/queries/usePolicyListQuery';

const PolicyData: Policy[] = [
  {
    ruleId: 1,
    alarmLevel: 1,
    alarmRuleType: 1,
    ruleName: '设备在线次数告警',
    alarmSourceObject: '平台',
    ruleDesc: '上报次数>5',
    alarmType: 0,
    noticeId: '0001',
    enable: 0,
  },
];

export default PolicyData;
