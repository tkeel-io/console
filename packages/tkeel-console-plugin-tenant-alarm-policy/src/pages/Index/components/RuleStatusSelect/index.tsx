import { Select, SelectProps } from '@tkeel/console-components';
import { RuleStatus, RuleStatusSelectValue } from '@tkeel/console-types';

interface Props extends Omit<SelectProps, 'options' | 'onChange'> {
  onChange: (status: RuleStatusSelectValue) => void;
}

export default function RuleStatusSelect(props: Props) {
  const { onChange, ...restProps } = props;

  const options = [
    {
      label: '启用',
      value: '1',
    },
    {
      label: '停用',
      value: '0',
    },
  ];

  return (
    <Select
      labelPrefix="状态："
      options={options}
      onChange={(value) =>
        onChange(value === '' ? -1 : (Number(value) as RuleStatus))
      }
      {...restProps}
    />
  );
}
