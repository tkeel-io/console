import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { PageHeaderToolbar } from '@tkeel/console-components/';
import { usePagination } from '@tkeel/console-hooks';

import CreateDeviceButton from './components/CreateDeviceButton';
import DeviceGroupTree from './components/DeviceGroupTree';
import DeviceListTable from './components/DeviceListTable';
import GroupBasicInfo from './components/GroupBasicInfo';

import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

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
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { setPageNum } = pagination;
  const handleSelectGroup = (item: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  }) => {
    setGroupItem(item);
  };
  return (
    <Flex flexDirection="column" h="100%">
      {/* <Flex h="48px" w="100%" align="center">
        <Heading as="h3" fontSize="14px" lineHeight="32px">
          设备列表
        </Heading>
        <Spacer />
        <SearchInput
          onSearch={handleSearchDevice}
          inputStyle={{ bg: 'gray.50' }}
          inputGroupStyle={{ mr: '16px' }}
        />
        <CreateDeviceButton variant="solid" />
      </Flex> */}
      <PageHeaderToolbar
        name="设备列表"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
        buttons={[<CreateDeviceButton key="create" variant="solid" />]}
      />
      <Box
        position="relative"
        display="flex"
        flex="1"
        overflow="hidden"
        marginTop="8px"
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
          <DeviceListTable groupItem={groupItem} keyWords={keyWords} />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
