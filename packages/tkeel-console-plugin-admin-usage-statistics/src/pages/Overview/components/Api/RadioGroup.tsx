import type { StyleProps } from '@chakra-ui/react';
import { useRadioGroup, VStack } from '@chakra-ui/react';
import { noop } from 'lodash';

import type { Props as SegmentedControlOptionProps } from './Radio';
import Radio from './Radio';

const OPTIONS = [
  { value: 'times', label: 'API 调用总次数', val: 98_422 },
  { value: 'time', label: 'API 调用累积平均耗时 (ms)', val: 8.6 },
];

interface Props {
  sx?: StyleProps;
  onChange?: (nextValue: string | number) => void;
}

export default function RadioGroup({ onChange = noop }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: OPTIONS[0].value,
    onChange,
  });

  const rootProps = getRootProps();

  return (
    <VStack spacing="10px" {...rootProps}>
      {OPTIONS.map((option) => {
        const radioProps = getRadioProps(option) as SegmentedControlOptionProps;
        return <Radio key={option.value} {...radioProps} />;
      })}
    </VStack>
  );
}
