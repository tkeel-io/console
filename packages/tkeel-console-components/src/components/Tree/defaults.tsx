import {
  ChevronDownFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';

import { TreeProps } from './types';

export const DEFAULT_PREFIX_CLS = 'rc-tree';

export const DEFAULT_PROPS: Partial<TreeProps> = {
  showLine: false,
  showIcon: false,
  extras: {
    isTreeTitleFullWidth: true,
  },
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
