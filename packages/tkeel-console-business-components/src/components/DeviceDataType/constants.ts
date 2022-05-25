export const DATA_TYPE_CONFIG = {
  max: { label: '最大值', type: 'number' },
  min: { label: '最小值', type: 'number' },
  step: { label: '步长', type: 'number' },
  unit: { label: '单位', type: 'string' },
  '0': { label: '布尔值 0', type: 'string' },
  '1': { label: '布尔值 1', type: 'string' },
  length: { label: '数据最大长度', type: 'number' },
};

const defaultConfigs = ['max', 'min', 'step', 'unit'];

export const DATA_TYPE = [
  {
    label: 'int32(整型)',
    value: 'int',
    configs: defaultConfigs,
  },
  {
    value: 'float',
    label: 'float(浮点型)',
    configs: defaultConfigs,
  },
  {
    value: 'double',
    label: 'double(双精度浮点型)',
    configs: defaultConfigs,
  },
  {
    value: 'bool',
    label: 'bool(布尔)',
    configs: ['0', '1'],
  },
  {
    value: 'string',
    label: 'string(字符串)',
    configs: ['length'],
  },
  {
    value: 'enum',
    label: 'enum(枚举项)',
    configs: ['unit'],
  },
  {
    value: 'struct',
    label: 'struct(结构体)',
    configs: [],
  },
];
