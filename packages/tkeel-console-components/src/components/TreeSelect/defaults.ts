import { merge } from 'lodash';

import { DEFAULT_PROPS as DEFAULT_SELECT_PROPS } from '../Select/defaults';
import { DEFAULT_PROPS as DEFAULT_TREE_PROPS } from '../Tree/defaults';

export const DEFAULT_SELECT_PREFIX_CLS = 'rc-tree-select';
export const DEFAULT_TREE_PREFIX_CLS = 'rc-tree-select-tree';

export const DEFAULT_PROPS = merge(
  {
    treeIcon: false,
  },
  DEFAULT_SELECT_PROPS,
  DEFAULT_TREE_PROPS
);
