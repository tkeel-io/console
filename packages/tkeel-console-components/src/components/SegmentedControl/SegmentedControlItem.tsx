import { TabProps, useTheme } from '@chakra-ui/react';

import { Theme } from '@tkeel/console-themes';

import { StyledTab } from './SegmentedControlItem.styled';

export default function SegmentedControlItem(props: TabProps) {
  const { colors } = useTheme<Theme>();

  return <StyledTab colors={colors} {...props} />;
}
