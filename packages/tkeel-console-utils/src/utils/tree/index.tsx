import { values } from 'lodash';
import { CSSProperties } from 'react';

import {
  FolderCloseTwoToneIcon,
  FolderOpenTwoToneIcon,
} from '@tkeel/console-icons';
import { TreeNodeInfo, TreeNodeType } from '@tkeel/console-request-hooks';

export interface TreeNodeData {
  title: string;
  id: string;
  children: TreeNodeData[];
  originData: {
    nodeInfo: TreeNodeInfo;
    subNode: TreeNodeType;
  };
  key: string;
}

function getTreeIcon(props: { selected: boolean; expanded: boolean }) {
  const { selected, expanded } = props;
  const color = selected ? 'primary' : 'gray.700';
  const twoToneColor = selected ? 'primarySub2' : 'gray.300';
  const iconStyle = {
    size: 20,
    color,
    twoToneColor,
    style: { position: 'relative', bottom: '2px' } as CSSProperties,
  };

  return expanded ? (
    <FolderOpenTwoToneIcon {...iconStyle} />
  ) : (
    <FolderCloseTwoToneIcon {...iconStyle} />
  );
}

type Props = {
  data: TreeNodeType;
  noTitleText?: string;
};

export default function getTreeNodeData({
  data,
  noTitleText = '暂无数据',
}: Props): TreeNodeData[] {
  return values(data).map((item) => {
    const { nodeInfo, subNode } = item;
    const { id, properties } = nodeInfo;
    return {
      title: properties?.group?.name ?? noTitleText,
      id,
      children: getTreeNodeData({ data: subNode }),
      originData: item,
      key: id,
      icon: ({
        expanded,
        selected,
      }: {
        expanded: boolean;
        selected: boolean;
      }) => getTreeIcon({ expanded, selected }),
    };
  });
}
