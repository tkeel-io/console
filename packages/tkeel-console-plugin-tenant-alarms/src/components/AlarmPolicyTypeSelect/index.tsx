import { Select, SelectProps } from '@tkeel/console-components';

import { ALARMS_POLICY } from '@/tkeel-console-plugin-tenant-alarms/constants';

import AlarmPolicyTypeTag from '../AlarmPolicyTypeTag';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (level: number) => void;
}

export default function AlarmPolicyTypeSelect(props: Props) {
  const { onChange, styles, ...restProps } = props;

  const options = Object.values(ALARMS_POLICY).map(({ value }) => ({
    label: <AlarmPolicyTypeTag type={value} />,
    value: String(value),
  }));

  return (
    <Select
      labelPrefix="告警策略类型："
      options={options}
      onChange={(value) => onChange(value === '' ? -1 : Number(value))}
      styles={{
        wrapper: {
          width: '170px',
        },
        ...styles,
      }}
      {...restProps}
    />
  );
}
