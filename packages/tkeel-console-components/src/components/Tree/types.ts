import { TreeProps as RCTreeProps } from 'rc-tree';

export interface TreeExtrasProps {
  extras?: {
    isTreeTitleFullWidth?: boolean;
    hideTreeIcon?: boolean;
  };

  styles?: {
    tree?: string;
    treeNodeContentWrapper?: string;
    treeTitle?: string;
  };
}

export interface TreeProps
  extends Omit<RCTreeProps, 'prefixCls'>,
    TreeExtrasProps {}
