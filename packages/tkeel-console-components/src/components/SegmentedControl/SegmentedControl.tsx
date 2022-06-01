import type { StyleProps } from '@chakra-ui/react';
import { Box, useRadioGroup } from '@chakra-ui/react';
import { noop } from 'lodash';
import { ReactNode } from 'react';

import type { Props as SegmentedControlOptionProps } from './SegmentedControlOption';
import SegmentedControlOption from './SegmentedControlOption';
import * as styles from './styles';

interface Option {
  value: string | number;
  label?: ReactNode;
  isDisabled?: boolean;
}

interface Props {
  name?: string;
  options: Option[] | string[] | number[];
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (nextValue: string | number) => void;
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    option?: StyleProps;
    label?: StyleProps;
    labelActive?: StyleProps;
    labelDisabled?: StyleProps;
  };
}

function transformOptions(options: Option[] | string[] | number[]): Option[] {
  return options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        value: option,
        label: option,
      };
    }

    return option;
  });
}

export default function SegmentedControl({
  name,
  options,
  value,
  defaultValue,
  onChange = noop,
  sx,
  styles: customStyles,
}: Props) {
  const data = transformOptions(options);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    value,
    defaultValue,
    onChange,
  });

  const rootProps = getRootProps();

  return (
    <Box {...rootProps} {...styles.root} {...customStyles?.root} {...sx}>
      {data.map((option) => {
        const radioProps = getRadioProps(option) as SegmentedControlOptionProps;
        return (
          <SegmentedControlOption
            key={option.value}
            {...radioProps}
            sx={customStyles?.label}
            styles={{
              root: customStyles?.option,
              label: customStyles?.label,
              labelActive: customStyles?.labelActive,
              labelDisabled: customStyles?.labelDisabled,
            }}
          />
        );
      })}
    </Box>
  );
}
