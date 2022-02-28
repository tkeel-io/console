import { Theme, useTheme } from '@chakra-ui/react';
import RCTreeSelect, { TreeSelectProps } from 'rc-tree-select';

import { PREFIX_CLS } from './constants';
import { StyledWrapper } from './styled';

export default function TreeSelect(props: TreeSelectProps) {
  const { colors }: Theme = useTheme();

  return (
    <StyledWrapper colors={colors}>
      <RCTreeSelect prefixCls={PREFIX_CLS} {...props} />
    </StyledWrapper>
  );
}
