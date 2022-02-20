import RCTree, { TreeProps } from 'rc-tree';

import 'rc-tree/assets/index.css';

export default function Tree(props: TreeProps) {
  return <RCTree {...props} />;
}
