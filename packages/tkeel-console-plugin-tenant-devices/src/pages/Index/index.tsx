import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { PageHeaderToolbar } from '@tkeel/console-components/';
import { usePagination } from '@tkeel/console-hooks';

import { ApiData as DeviceResData } from '@/tkeel-console-plugin-tenant-devices/hooks/mutations/useCreateDeviceMutation';
import {
  NodeInfo,
  TreeNodeType,
} from '@/tkeel-console-plugin-tenant-devices/hooks/queries/useGroupTreeQuery';

import CreateDeviceButton from './components/CreateDeviceButton';
import DeviceGroupTree from './components/DeviceGroupTree';
import DeviceListTable from './components/DeviceListTable';
import GroupBasicInfo from './components/GroupBasicInfo';

const defaultGroupItem = {
  nodeInfo: {
    id: '',
    properties: {
      group: {
        name: '暂无数据',
        description: '暂无描述',
        ext: {},
        parentId: '',
      },
      sysField: {},
    },
  },
  subNode: {},
};

function Index(): JSX.Element {
  const [tableKey, setTableKey] = useState('');
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
      <PageHeaderToolbar
        name="设备列表"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateDeviceButton
            key="create"
            variant="solid"
            onSuccess={({ data }: { data: DeviceResData }) => {
              setTableKey(data?.deviceObject?.id ?? '');
            }}
          />,
        ]}
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
          <DeviceListTable
            key={tableKey}
            groupItem={groupItem}
            keyWords={keyWords}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default Index;
