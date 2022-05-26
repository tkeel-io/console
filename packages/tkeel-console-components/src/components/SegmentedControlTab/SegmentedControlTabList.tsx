import type { StyleProps } from '@chakra-ui/react';
import { TabList, TabListProps } from '@chakra-ui/react';

import * as styles from '../SegmentedControl/styles';

interface Props extends TabListProps {
  sx?: StyleProps;
  styles?: {
    root?: StyleProps;
  };
}

export default function SegmentedControlTabList({
  sx,
  styles: customStyles,
  ...tabListProps
}: Props) {
  return (
    <TabList
      {...tabListProps}
      {...styles.root}
      {...sx}
      {...customStyles?.root}
    />
  );
}
