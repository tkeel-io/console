import { Tree, TreeNode } from '@tkeel/console-components';

export default function TreeDemo() {
  return (
    <div>
      <h1>Tree Demo</h1>
      <Tree prefixCls="rc-tree">
        <TreeNode key={1} title="a" />
        <TreeNode key={2} title="b" />
      </Tree>
    </div>
  );
}
