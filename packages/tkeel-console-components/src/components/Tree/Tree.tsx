import { Theme, useTheme } from '@chakra-ui/react';
import {
  ChevronDownFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';
import { merge } from 'lodash';
import RCTree, { TreeProps } from 'rc-tree';

import { PREFIX_CLS } from './constants';
import { StyledWrapper } from './styled';

const defaultProps: Partial<TreeProps> = {
  switcherIcon: (props) => {
    const { isLeaf, expanded } = props;

    if (isLeaf) {
      return null;
    }

    if (expanded) {
      return <ChevronDownFilledIcon size="16px" />;
    }

    return <ChevronRightFilledIcon size="16px" />;
  },
};

export default function Tree(props: Omit<TreeProps, 'prefixCls'>) {
  const properties = merge({}, defaultProps, props);
  const { colors }: Theme = useTheme();

  return (
    <StyledWrapper colors={colors}>
      <RCTree prefixCls={PREFIX_CLS} {...properties} />
    </StyledWrapper>
  );
}
