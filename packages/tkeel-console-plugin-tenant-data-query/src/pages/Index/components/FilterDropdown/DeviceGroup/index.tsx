import { Tree } from '@tkeel/console-components';
import { FileBoxTwoToneIcon } from '@tkeel/console-icons';
import { values } from 'lodash';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-query/hooks/queries/useDeviceGroupQuery';

export interface TreeNodeData {
  title: string;
  id: string;
  children: TreeNodeData[];
  originData: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
  key: string;
}

function getTreeNodeData(data: TreeNodeType): TreeNodeData[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    return {
      title: properties?.group?.name ?? '暂无数据',
      id,
      children: getTreeNodeData(subNode),
      originData: item,
      key: id,
    };
  });
}

type Props = {
  deviceGroupTree: TreeNodeType;
};

export default function DeviceGroup({ deviceGroupTree }: Props) {
  const treeNodeData = getTreeNodeData(deviceGroupTree);
  // eslint-disable-next-line no-console
  console.log('DeviceGroup ~ treeNodeData', treeNodeData);

  return (
    <Tree
      style={{ marginTop: '16px' }}
      icon={FileBoxTwoToneIcon}
      treeData={treeNodeData}
    />
  );
}
