import { Select, SelectProps } from '@tkeel/console-components';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (level: number) => void;
}

export const ALARM_TYPE_OPTIONS = [
  {
    label: '基础告警',
    value: '0',
  },
  {
    label: '持续告警',
    value: '1',
    disabled: true,
  },
];

export default function AlarmTypeSelect(props: Props) {
  const { onChange, styles, ...restProps } = props;

  const options = ALARM_TYPE_OPTIONS.map(({ label, value }) => ({
    label,
    value: String(value),
  }));

  return (
    <Select
      labelPrefix="告警类型："
      options={options}
      onChange={(value) => onChange(Number(value))}
      styles={{
        ...styles,
        wrapper: {
          width: '150px',
          ...styles?.wrapper,
        },
      }}
      {...restProps}
    />
  );
}
