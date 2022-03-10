// export const DEVICE_GROUP_ID = 'deviceGroup';
// export const DEVICE_TEMPLATES_ID = 'deviceTemplates';

export enum FilterConditionIds {
  DEVICE_GROUP_ID = 'deviceGroup',
  DEVICE_TEMPLATES_ID = 'deviceTemplates',
  KEYWORDS = 'keywords',
}

export const conditions = [
  {
    id: FilterConditionIds.DEVICE_GROUP_ID,
    label: '设备分组',
  },
  {
    id: FilterConditionIds.DEVICE_TEMPLATES_ID,
    label: '设备模板',
  },
];
