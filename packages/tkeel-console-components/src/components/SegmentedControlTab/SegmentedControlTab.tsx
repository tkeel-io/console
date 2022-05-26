import type { StyleProps, TabProps } from '@chakra-ui/react';
import { Tab } from '@chakra-ui/react';

import * as styles from '../SegmentedControl/styles';

interface Props extends TabProps {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
    active?: StyleProps;
    disabled?: StyleProps;
  };
}

export default function SegmentedControlTab({
  sx,
  styles: customStyles,
  ...tabProps
}: Props) {
  return (
    <Tab
      {...tabProps}
      {...styles.label}
      {...customStyles?.root}
      {...sx}
      _focus={{ boxShadow: 'none' }}
      _selected={{ ...styles.labelActive, ...customStyles?.active }}
      _disabled={{ ...styles.labelDisabled, ...customStyles?.disabled }}
    />
  );
}
