import { TreeNode as RCTreeNode, TreeNodeProps } from 'rc-tree';

export default function TreeNode(props: TreeNodeProps) {
  return <RCTreeNode {...props} />;
}

TreeNode.isTreeNode = 1;
