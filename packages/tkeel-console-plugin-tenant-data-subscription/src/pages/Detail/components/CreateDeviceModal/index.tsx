import { values } from 'lodash';

import useDeviceGroupQuery, {
  TreeNodeData,
  // NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceGroupQuery';
import useDeviceTemplateQuery, {
  TemplateTreeNodeDataType,
  TemplateTreeNodeType,
} from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useDeviceTemplateQuery'; // TemplateTreeNodeType,
import BaseDeviceModal, {
  FormValues,
} from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/BaseDeviceModal';

type Props = {
  isOpen: boolean;
  isConfirmButtonLoading: boolean;
  onClose: () => unknown;
  onConfirm: (formValues: FormValues) => unknown;
};

// type TreeNodeData = {
//   title: string;
//   id: string;
//   children: TreeNodeData[];
//   originData: {
//     nodeInfo: NodeInfo;
//     subNode: TreeNodeType;
//   };
// };

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

function getTemplateTreeNodeData(
  data: TemplateTreeNodeType
): TemplateTreeNodeDataType[] {
  return values(data).map((item) => {
    return {
      title: item?.properties?.basicInfo?.name,
      id: item?.id,
      key: item?.id,
    };
  });
}

export default function CreateDeviceModal({
  isOpen,
  isConfirmButtonLoading,
  onClose,
  onConfirm,
}: Props) {
  const { groupTree } = useDeviceGroupQuery();
  const { items } = useDeviceTemplateQuery();
  const treeNodeData = getTreeNodeData(groupTree);
  const templateTreeNodeData = getTemplateTreeNodeData(items);
  // console.log('templateTreeNodeData', templateTreeNodeData);

  return (
    <BaseDeviceModal
      title="添加设备"
      isOpen={isOpen}
      treeNodeData={treeNodeData}
      templateTreeNodeData={templateTreeNodeData}
      isConfirmButtonLoading={isConfirmButtonLoading}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
