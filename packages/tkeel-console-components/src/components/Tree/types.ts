import { TreeProps as RCTreeProps } from 'rc-tree';

export interface TreeExtrasProps {
  extras?: {
    isTreeTitleFullWidth?: boolean;
  };

  styles?: {
    treeNodeContentWrapper?: string;
    treeTitle?: string;
  };
}

export interface TreeProps
  extends Omit<RCTreeProps, 'prefixCls'>,
    TreeExtrasProps {}
