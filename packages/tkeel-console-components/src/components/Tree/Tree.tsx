import RCTree, { TreeProps } from 'rc-tree';

import 'rc-tree/assets/index.css';

export default function Tree(props: Omit<TreeProps, 'prefixCls'>) {
  return <RCTree prefixCls="rc-tree" {...props} />;
}
