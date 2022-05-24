import { Flex, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import {
  DatabaseCacheTwoToneIcon,
  DataWarehouseTwoToneIcon,
} from '@tkeel/console-icons';

import { Permission } from '@/tkeel-console-plugin-tenant-roles/hooks/queries/usePermissionsQuery';

interface TreeNodeData extends Permission {
  key: string;
  title: ReactNode;
  children?: TreeNodeData[];
}

export type TreeData = TreeNodeData[];

export function getTreeData(
  data: Permission[] = [],
  parentKey?: string
): TreeData {
  return data.map(({ id, name, children = [], ...rest }) => {
    const key = parentKey ? `${parentKey}/${id}` : id;
    const hasChildren = children.length > 0;
    const Icon = hasChildren
      ? DatabaseCacheTwoToneIcon
      : DataWarehouseTwoToneIcon;

    const treeData = {
      key,
      title: (
        <Flex alignItems="center" flex="1">
          <Icon size="16px" />
          <Text paddingLeft="4px">{name}</Text>
        </Flex>
      ),
      name,
      id,
      ...rest,
    };

    if (hasChildren) {
      return { ...treeData, children: getTreeData(children, key) };
    }

    return treeData;
  });
}

export function getParentKeys({
  keyType = 'self',
  keyValue = '',
}: {
  keyType?: 'self' | 'parent';
  keyValue: string | number;
}) {
  const str = String(keyValue).trim();

  if (!str) {
    return [];
  }

  const ids = str.split('/');
  const { length } = ids;
  const keys = [];

  if (length > 0) {
    const endIndex = keyType === 'parent' ? length : length - 1;
    let index = 0;

    while (index < endIndex) {
      keys.push(ids.slice(0, index + 1).join('/'));
      index += 1;
    }
  }

  return keys;
}

export function getChildKeys(data: TreeData = []) {
  const keys = [];
  const queue = [...data];

  while (queue.length > 0) {
    const node = queue.shift();
    const key = node?.key as string;
    const children = node?.children ?? [];
    keys.push(key);
    if (children.length > 0) {
      queue.push(...children);
    }
  }

  return keys;
}
