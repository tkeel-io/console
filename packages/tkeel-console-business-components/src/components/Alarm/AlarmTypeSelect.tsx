import { Select, SelectProps } from '@tkeel/console-components';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (level: number) => void;
}

export default function AlarmTypeSelect(props: Props) {
  const { onChange, ...restProps } = props;

  const options = [
    {
      label: '基础告警',
      value: '0',
    },
    {
      label: '持续告警',
      value: '1',
    },
  ];

  return (
    <Select
      labelPrefix="告警类型："
      options={options}
      onChange={(value) => onChange(Number(value))}
      {...restProps}
    />
  );
}
