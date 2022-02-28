import 'rc-tree-select/assets/index.less';

import RCTreeSelect, { TreeSelectProps } from 'rc-tree-select';

import TreeStyles from '../Tree/TreeStyles';
import { DEFAULT_PREFIX_CLS } from './defaults';

export default function TreeSelect(props: TreeSelectProps) {
  return (
    <>
      <TreeStyles prefixCls={DEFAULT_PREFIX_CLS} />
      <RCTreeSelect {...props} />
    </>
  );
}
