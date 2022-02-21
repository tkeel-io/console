import { useState } from 'react';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { SearchInput } from '@tkeel/console-components/';

import CreateDeviceButton from './components/CreateDeviceButton';
import DeviceGroupTree from './components/DeviceGroupTree';
import DeviceListTable from './components/DeviceListTable';
import GroupBasicInfo from './components/GroupBasicInfo';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

const handleSearchDevice = (keyword: string) => {
  // eslint-disable-next-line no-console
  console.log(keyword);
};
const defaultGroupItem = {
  nodeInfo: {
    id: '',
    properties: {
      group: {
        name: '暂无数据',
        description: '暂无描述',
        ext: {},
      },
      sysField: {},
    },
  },
  subNode: {},
};

function Index(): JSX.Element {
  const [groupItem, setGroupItem] = useState(defaultGroupItem);
  const handleSelectGroup = (item: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  }) => {
    // eslint-disable-next-line no-console
    console.log('handleSelectGroup', item);
    setGroupItem(item);
  };
  return (
    <Flex flexDirection="column" h="100%">
      <Flex h="48px" w="100%" align="center">
        <Heading as="h3" fontSize="14px" lineHeight="32px">
          设备列表
        </Heading>
        <Spacer />
        <SearchInput
          onSearch={handleSearchDevice}
          inputStyle={{ bg: 'gray.50' }}
          inputGroupStyle={{ mr: '16px' }}
        />
        <CreateDeviceButton />
      </Flex>
      <Box
        position="relative"
        display="flex"
        flex="1"
        overflow="hidden"
        marginTop="16px"
      >
        <DeviceGroupTree handleSelectGroup={handleSelectGroup} />
        <Flex flex="1" bg="white" p="12px 20px" flexDirection="column">
          <Box
            color="grayAlternatives.300"
            h="24px"
            fontSize="14px"
            lineHeight="24px"
            mb="8px"
          >
            当前分组：默认分组/自定义分组3
          </Box>
          <GroupBasicInfo groupItem={groupItem} />
          <DeviceListTable groupItem={groupItem} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
