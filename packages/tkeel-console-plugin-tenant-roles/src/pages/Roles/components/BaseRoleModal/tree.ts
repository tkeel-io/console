import { Permission } from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

interface TreeNodeData extends Permission {
  key: string;
  title: string;
  children?: TreeNodeData[];
}

export type TreeData = TreeNodeData[];

export function getTreeData(
  data: Permission[] = [],
  parentKey?: string
): TreeData {
  return data.map(({ id, name, children = [], ...rest }) => {
    const key = parentKey ? `${parentKey}/${id}` : id;
    const treeData = {
      key,
      title: name,
      name,
      id,
      ...rest,
    };

    if (children.length > 0) {
      return { ...treeData, children: getTreeData(children, key) };
    }

    return treeData;
  });
}
