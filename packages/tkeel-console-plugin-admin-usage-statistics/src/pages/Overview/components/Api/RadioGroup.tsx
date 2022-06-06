import type { StyleProps } from '@chakra-ui/react';
import { useRadioGroup, VStack } from '@chakra-ui/react';
import { noop } from 'lodash';

import { DEFAULT_VALUE, OPTIONS } from './constants';
import type { Props as SegmentedControlOptionProps } from './Radio';
import Radio from './Radio';

interface Props {
  defaultValue?: string;
  sx?: StyleProps;
  onChange?: (nextValue: string | number) => void;
}

export default function RadioGroup({
  defaultValue = DEFAULT_VALUE,
  sx,
  onChange = noop,
}: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue,
    onChange,
  });

  const rootProps = getRootProps();

  return (
    <VStack spacing="10px" {...sx} {...rootProps}>
      {OPTIONS.map((option) => {
        const radioProps = getRadioProps(option) as SegmentedControlOptionProps;
        return <Radio key={option.value} {...radioProps} />;
      })}
    </VStack>
  );
}
