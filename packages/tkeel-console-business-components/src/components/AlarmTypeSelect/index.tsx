import { Select, SelectProps, Tooltip } from '@tkeel/console-components';
import { AlarmType, AlarmTypeSelectValue } from '@tkeel/console-types';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (level: AlarmTypeSelectValue) => void;
}

export const ALARM_TYPE_OPTIONS = [
  {
    label: '基础告警',
    value: '0',
  },
  {
    label: <Tooltip label="敬请期待">持续告警</Tooltip>,
    value: '1',
    disabled: true,
  },
];

export default function AlarmTypeSelect(props: Props) {
  const { onChange, styles, ...restProps } = props;

  const options = ALARM_TYPE_OPTIONS.map(({ label, value, disabled }) => ({
    label,
    value: String(value),
    disabled,
  }));

  return (
    <Select
      labelPrefix="告警类型："
      options={options}
      onChange={(value) =>
        onChange(value === '' ? -1 : (Number(value) as AlarmType))
      }
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
