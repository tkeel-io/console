export enum AlarmLevel {
  Critical = 1,
  Major,
  Minor,
  Warning,
} // 1：紧急 2：重要；3：次要；4：提示

export type AlarmLevelSelectValue = -1 | AlarmLevel;

export enum AlarmRuleType {
  Threshold,
  System,
} // 0：阈值告警；1：系统告警

export type AlarmRuleTypeSelectValue = -1 | AlarmRuleType;

export enum AlarmType {
  Base,
  Continuous,
} // 0：基础告警；1：持续告警

export type AlarmTypeSelectValue = -1 | AlarmType;

export enum RuleStatus {
  Disabled,
  Enabled,
} // 0：停用；1：启用

export enum AlarmSourceObject {
  Platform,
  Device,
} // 0：平台；1：设备
