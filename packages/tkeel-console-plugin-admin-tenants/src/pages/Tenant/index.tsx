import { Box, Flex, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { CustomTab, CustomTabList } from '@tkeel/console-components';
import { HumanFilledIcon } from '@tkeel/console-icons';

import BackButton from './components/BackButton';
import Dropdown from './components/Dropdown';
import SpaceInfoCard from './components/SpaceInfoCard';
import Users from './components/Users';

const infos = {
  title: '设备名称',
  desc: '备注',
  list: [
    { label: '租户ID', value: 'ID_2020123' },
    { label: '创建时间', value: '2020.12.21 12:43:41' },
    { label: '管理员', value: 'esthera@simmmple.com' },
    { label: '客户数', value: '59' },
  ],
};

export default function Tenant() {
  const menu = [
    {
      key: 'edit',
      label: '编辑基础信息',
      icon: HumanFilledIcon,
    },
    { key: 'rest', label: '重置管理员密码', icon: HumanFilledIcon },
    { key: 'delete', label: '删除租户空间', icon: HumanFilledIcon },
  ];

  return (
    <Flex height="100%">
      <Box width="360px">
        <Flex bg="gray.50" pt="16px" px="16px" justify="space-between">
          <BackButton />
          <Dropdown menu={menu}>更多操作</Dropdown>
        </Flex>
        <SpaceInfoCard infos={infos} />
      </Box>
      <Tabs display="flex" flexDirection="column" marginLeft="20px" flex="1">
        <CustomTabList>
          <CustomTab>客户列表</CustomTab>
          {/* <CustomTab>第三方认证</CustomTab> */}
        </CustomTabList>
        <TabPanels
          flex="1"
          overflow="hidden"
          borderRadius="4px"
          backgroundColor="white"
        >
          <TabPanel display="flex" flexDirection="column">
            <Users />
          </TabPanel>
          {/* <TabPanel>
            <p>two!</p>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
