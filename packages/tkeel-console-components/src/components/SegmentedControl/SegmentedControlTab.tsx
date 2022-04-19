import { TabProps, useTheme } from '@chakra-ui/react';

import { Theme } from '@tkeel/console-themes';

import { StyledTab } from './SegmentedControlTab.styled';

export default function SegmentedControlTab(props: TabProps) {
  const { colors } = useTheme<Theme>();

  return <StyledTab colors={colors} {...props} />;
}
