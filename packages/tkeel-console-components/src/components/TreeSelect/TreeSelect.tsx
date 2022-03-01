import 'rc-tree-select/assets/index.less';

import { merge } from 'lodash';
import RCTreeSelect from 'rc-tree-select';

import SelectStyles from '../Select/SelectStyles';
import TreeStyles from '../Tree/TreeStyles';
import {
  DEFAULT_PROPS,
  DEFAULT_SELECT_PREFIX_CLS,
  DEFAULT_TREE_PREFIX_CLS,
} from './defaults';
import { TreeSelectProps } from './types';

export default function TreeSelect(props: TreeSelectProps) {
  const properties = merge({}, DEFAULT_PROPS, props);
  const { extras, styles } = properties;

  return (
    <>
      <SelectStyles prefixCls={DEFAULT_SELECT_PREFIX_CLS} />
      <TreeStyles
        prefixCls={DEFAULT_TREE_PREFIX_CLS}
        extras={extras}
        styles={styles}
      />
      <RCTreeSelect {...properties} />
    </>
  );
}
