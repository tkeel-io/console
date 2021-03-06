import { Empty, Loading, SearchEmpty, Tree } from '@tkeel/console-components';
import { TreeNodeData } from '@tkeel/console-utils';

type Props = {
  isLoading: boolean;
  treeNodeData: TreeNodeData[];
  groupId: string;
  keywords: string;
  setGroupId: (key: string) => unknown;
};

export default function DeviceGroupTree({
  isLoading,
  treeNodeData,
  groupId,
  keywords,
  setGroupId,
}: Props) {
  if (isLoading) {
    return <Loading styles={{ wrapper: { height: '100%' } }} />;
  }

  if (treeNodeData.length === 0) {
    return keywords ? (
      <SearchEmpty
        title="没有符合条件的设备组"
        styles={{ wrapper: { height: '100%' } }}
      />
    ) : (
      <Empty
        type="component"
        styles={{
          wrapper: { width: '100%', height: '100%' },
        }}
      />
    );
  }

  return (
    <Tree
      extras={{ isTreeTitleFullWidth: true }}
      treeData={treeNodeData}
      selectedKeys={[groupId]}
      selectable
      showIcon
      onSelect={(_, info) => {
        const key = info.node.key as string;
        if (key && key !== groupId) {
          setGroupId(key);
        }
      }}
      styles={{
        treeNodeContentWrapper: 'flex: 1',
        treeTitle: 'font-size:14px; line-height: 32px;',
      }}
    />
  );
}
