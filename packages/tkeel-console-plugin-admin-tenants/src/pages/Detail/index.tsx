import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { HumanFilledIcon } from '@tkeel/console-icons';

import SpaceInfoCard from './SpaceInfoCard';

import {
  BackButton,
  CustomTab,
  Dropdown,
} from '@/tkeel-console-plugin-admin-tenants/components';

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

function Detail() {
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
    <Flex h="100%">
      <Box w="360px" mr="20px">
        <Flex bg="gray.50" pt="16px" px="16px" justify="space-between">
          <BackButton />
          <Dropdown menu={menu}>更多操作</Dropdown>
        </Flex>
        <SpaceInfoCard infos={infos} />
      </Box>
      <Tabs display="flex" flex="1" flexDirection="column">
        <TabList
          h="40px"
          border="none"
          borderRadius="4px"
          backgroundColor="gray.800"
        >
          <CustomTab>客户列表</CustomTab>
          <CustomTab>资源管理</CustomTab>
          <CustomTab>用量统计</CustomTab>
        </TabList>

        <TabPanels flex="1" mt="16px" bg="white" borderRadius="4px">
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default Detail;
