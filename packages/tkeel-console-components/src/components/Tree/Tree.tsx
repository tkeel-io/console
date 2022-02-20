import {
  ChevronDownFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';
import { merge } from 'lodash';
import RCTree, { TreeProps } from 'rc-tree';

import 'rc-tree/assets/index.css';

const defaultProps: Partial<TreeProps> = {
  switcherIcon: (props) => {
    const { isLeaf, expanded } = props;

    if (isLeaf) {
      return null;
    }

    if (expanded) {
      return <ChevronDownFilledIcon />;
    }

    return <ChevronRightFilledIcon />;
  },
};

export default function Tree(props: Omit<TreeProps, 'prefixCls'>) {
  const properties = merge({}, defaultProps, props);

  return <RCTree prefixCls="rc-tree" {...properties} />;
}
