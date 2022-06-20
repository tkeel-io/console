import { ALARM_LEVEL_INFO_MAP } from '@tkeel/console-business-components';
import { AlarmSourceObject, RuleStatus } from '@tkeel/console-types';

export { ALARM_TYPE_OPTIONS } from '@tkeel/console-business-components';

export const ALARM_LEVEL_MAP = {
  1: '紧急',
  2: '重要',
  3: '次要',
  4: '提示',
};

export const ALARM_LEVEL_OPTIONS = Object.entries(ALARM_LEVEL_INFO_MAP).map(
  ([key, value]) => ({
    label: value.label,
    value: key,
  })
);

export const ALARM_RULE_TYPE_MAP = {
  0: '阈值告警',
  1: '系统告警',
};

export const ALARM_RULE_TYPE_MAP_OPTIONS = Object.entries(
  ALARM_RULE_TYPE_MAP
).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const ALARM_TYPE_MAP = {
  0: '基础告警',
  1: '持续告警',
};

export const RULE_STATUS_MAP = {
  [RuleStatus.Disabled]: '停用',
  [RuleStatus.Enabled]: '启用',
};

export const ALARM_SOURCE_OBJECT_MAP = {
  [AlarmSourceObject.Device]: '设备',
  [AlarmSourceObject.Platform]: '平台',
};

export const durationOptions = [
  {
    label: '即时',
    value: 0,
  },
  {
    label: '1分钟',
    value: 1,
  },
  {
    label: '3分钟',
    value: 3,
  },
  {
    label: '5分钟',
    value: 5,
  },
];

export const polymerizeOptions = [
  {
    label: '平均值',
    value: 'avg',
  },
  {
    label: '最大值',
    value: 'max',
  },
  {
    label: '最小值',
    value: 'min',
  },
];

const eqOption = {
  label: '= 等于',
  value: 'eq',
};

const neOption = {
  label: '≠ 不等于',
  value: 'ne',
};

export const enumOperatorOptions = [eqOption, neOption];

export const numberOperatorOptions = [
  {
    label: '> 大于',
    value: 'gt',
  },
  {
    label: '< 小于',
    value: 'lt',
  },
  eqOption,
  {
    label: '≥ 大于等于',
    value: 'ge',
  },
  {
    label: '≤ 小于等于',
    value: 'le',
  },
  neOption,
];

export const thresholdAlarmSourceObjectOptions = [
  {
    label: '设备',
    value: 'device',
  },
];

export const systemAlarmSourceObjectOptions = [
  {
    label: '平台',
    value: 'platform',
  },
];
