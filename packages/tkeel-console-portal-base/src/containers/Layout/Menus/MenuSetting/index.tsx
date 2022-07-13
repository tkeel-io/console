import { Button, CloseButton, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { AceEditor, Tree } from '@tkeel/console-components';

import { adminMenus, tenantMenus } from '@/tkeel-console-portal-base/constants';
import { Menu } from '@/tkeel-console-portal-base/hooks/queries/useMenusQuery';

type Props = {
  mockMenus: string;
  setMockMenus: (menus: string) => unknown;
  onClose: () => unknown;
};

type TreeNodeData = {
  id: string;
  key: string;
  title: string;
  children: TreeNodeData[];
  originData: Menu;
};

function getTreeData(menus: Menu[]): TreeNodeData[] {
  return menus.map((menu) => {
    const { id, name, children } = menu;
    return {
      title: name,
      id,
      children: children ? getTreeData(children) : [],
      originData: menu,
      key: id,
    };
  });
}

function getCheckedKeysByMenus({
  menus,
  totalMenus,
}: {
  menus: Menu[];
  totalMenus: Menu[];
}) {
  const menuIds: string[] = [];
  menus.forEach((menu) => {
    const { id, children } = menu;
    if (Array.isArray(children) && children.length > 0) {
      let existMenuNum = 0;
      children.forEach((item) => {
        menuIds.push(item.id);
        existMenuNum += 1;
      });
      const originalMenu = totalMenus.find((item) => item.id === id);
      const { children: originalChildren } = originalMenu || {};
      if (
        Array.isArray(originalChildren) &&
        existMenuNum === originalChildren.length
      ) {
        menuIds.push(id);
      }
    } else {
      menuIds.push(id);
    }
  });
  return menuIds;
}

export default function MenuSetting({
  mockMenus,
  setMockMenus,
  onClose,
}: Props) {
  const totalMenus =
    GLOBAL_PORTAL_CONFIG.portalName === 'admin' ? adminMenus : tenantMenus;
  const [checkedKeys, setCheckedKeys] = useState<string[]>(
    getCheckedKeysByMenus({
      menus: JSON.parse(mockMenus) as Menu[],
      totalMenus,
    })
  );
  // const [isShowTotalMenus, setIsShowTotalMenus] = useState(false);
  const treeData = getTreeData(totalMenus);

  const getMockMenusByIds = (checkedIds: string[]) => {
    const checkedMenus: Menu[] = [];
    totalMenus.forEach((menu) => {
      const { id, children } = menu;
      if (checkedIds.includes(id)) {
        checkedMenus.push(menu);
      } else if (Array.isArray(children)) {
        const checkedChildren = children.filter((item) =>
          checkedIds.includes(item.id)
        );
        if (checkedChildren.length > 0) {
          checkedMenus.push({
            ...menu,
            children: checkedChildren,
          });
        }
      }
    });
    return JSON.stringify(checkedMenus, null, 2);
  };

  return (
    <Flex
      position="fixed"
      left="0"
      bottom="0"
      zIndex="10"
      flexDirection="column"
      padding="20px"
      width="100%"
      height="640px"
      maxHeight="100vh"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="grayAlternatives.50"
      backgroundColor="white"
    >
      <CloseButton
        position="absolute"
        right="20px"
        top="20px"
        onClick={onClose}
      />
      <HStack flex="1" overflow="hidden" spacing="20px">
        <Flex height="100%" overflowY="auto">
          <Tree
            treeData={treeData}
            checkable
            defaultExpandAll
            checkedKeys={checkedKeys}
            selectable={false}
            styles={{ tree: 'width: 200px; padding-left: 10px;' }}
            onCheck={(keys) => {
              const checkedIds = keys as string[];
              setCheckedKeys(checkedIds);
              setMockMenus(getMockMenusByIds(checkedIds));
            }}
          />
        </Flex>
        <AceEditor
          language="json"
          value={mockMenus}
          style={{ flex: 1 }}
          // onChange={(value) => setMockMenus(value)}
        />
        {/* {isShowTotalMenus && (
          <AceEditor
            language="json"
            style={{ flex: 1 }}
            value={JSON.stringify(totalMenus, null, 2)}
          />
        )} */}
      </HStack>
      <Flex marginTop="20px" justifyContent="space-between" alignItems="center">
        <HStack spacing="10px">
          <Button width="80px" onClick={onClose}>
            关闭
          </Button>
          <Button
            marginTop="10px"
            colorScheme="brand"
            width="80px"
            onClick={() => {
              localStorage.setItem('mockMenus', mockMenus);
              onClose();
            }}
          >
            保存
          </Button>
        </HStack>
        {/* <Button onClick={() => setIsShowTotalMenus(!isShowTotalMenus)}>
          {isShowTotalMenus ? '隐藏' : '显示'}全部菜单
        </Button> */}
      </Flex>
    </Flex>
  );
}
