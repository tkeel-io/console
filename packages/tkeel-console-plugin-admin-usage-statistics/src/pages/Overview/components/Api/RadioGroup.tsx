import type { StyleProps } from '@chakra-ui/react';
import { useRadioGroup, VStack } from '@chakra-ui/react';
import { noop } from 'lodash';
import type { ReactNode } from 'react';

import { DEFAULT_VALUE } from './constants';
import Radio from './Radio';

interface Props {
  options: {
    value: string;
    text: ReactNode;
    content: number;
    convert?: (value: number) => number;
    formatter?: boolean | string;
  }[];
  defaultValue?: string;
  isLoading: boolean;
  sx?: StyleProps;
  onChange?: (nextValue: string | number) => void;
}

export default function RadioGroup({
  options,
  defaultValue = DEFAULT_VALUE,
  isLoading,
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
      {options.map((option) => {
        const { value, ...rest } = option;
        const radioProps = getRadioProps(option);
        return (
          <Radio key={value} isLoading={isLoading} {...rest} {...radioProps} />
        );
      })}
    </VStack>
  );
}
