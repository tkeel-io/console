import { merge } from 'lodash';
import RCTree from 'rc-tree';

import { DEFAULT_PREFIX_CLS, DEFAULT_PROPS } from './defaults';
import TreeStyles from './TreeStyles';
import { TreeProps } from './types';

export default function Tree(props: TreeProps) {
  const properties = merge({}, DEFAULT_PROPS, props);
  const { extras, styles } = properties;

  return (
    <>
      <TreeStyles extras={extras} styles={styles} />
      <RCTree prefixCls={DEFAULT_PREFIX_CLS} {...properties} />
    </>
  );
}
