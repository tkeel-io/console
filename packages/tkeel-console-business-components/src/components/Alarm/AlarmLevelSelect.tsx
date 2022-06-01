import { Select, SelectProps } from '@tkeel/console-components';

import AlarmLevelTag from './AlarmLevelTag';
import { ALARM_LEVEL_MAP } from './constants';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (level: number) => void;
}

export default function AlarmLevelSelect(props: Props) {
  const { onChange, ...restProps } = props;

  const options = Object.values(ALARM_LEVEL_MAP).map((level) => ({
    label: <AlarmLevelTag level={level} />,
    value: String(level),
  }));

  return (
    <Select
      labelPrefix="级别："
      options={options}
      onChange={(value) => onChange(Number(value))}
      {...restProps}
    />
  );
}
