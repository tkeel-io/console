import RCTreeSelect, { TreeSelectProps } from 'rc-tree-select';

import 'rc-tree-select/assets/index.less';

export default function TreeSelect(props: TreeSelectProps) {
  return <RCTreeSelect {...props} />;
}
