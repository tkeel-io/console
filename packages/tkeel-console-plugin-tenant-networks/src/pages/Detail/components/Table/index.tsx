import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Column } from 'react-table';

import { DeviceStatusIcon } from '@tkeel/console-business-components';
import {
  Empty,
  // MoreAction,
  PageHeaderToolbar,
  SearchEmpty,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { SmartObjectTwoToneIcon } from '@tkeel/console-icons';
import { formatDateTimeByTimestamp, plugin } from '@tkeel/console-utils';

import useNetworkListQuery from '@/tkeel-console-plugin-tenant-networks/hooks/queries/useNetworkListQuery';

import CreateProxyButton from '../CreateProxyButton';

// import Empty from '../Empty';

type Data = {
  ID: string;
  group: string;
  name: string;
  status: string;
  template: string;
  updated_at: string;
};

type Props = {
  id: string;
  // refetch?: () => unknown;
};

export default function Index({ id }: Props) {
  // const [keywords, setKeyWords] = useState('');

  // const [rowIds, setRowIds] = useState<string[]>([]);
  // const [rowNames, setRowNames] = useState<string[]>([]);
  const toast = plugin.getPortalToast();

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;

  const { entities, isLoading } = useNetworkListQuery({
    id: id || '',
    pageNum,
    pageSize,
    keywords: '',
    onSuccess(res) {
      const total = res?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  // const handleRefetch = () => {
  //   // TODO 添加或移除设备后有延迟，临时处理方案
  //   setTimeout(() => {
  //     refetch();
  //     refetchSubscribeInfo();
  //   }, 700);
  // };

  const handleCreatProxySuccess = () => {
    toast('创建成功', { status: 'success' });
    // refetch();
  };

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '代理服务名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <SmartObjectTwoToneIcon size={24} />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '状态',
      width: 100,
      accessor: 'status',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => <DeviceStatusIcon isOnline={value === 'online'} />,
          [value]
        ),
    },
    {
      Header: '连接',
      width: 100,
      accessor: 'template',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box color="gray.700" overflow="hidden">
              {value}
            </Box>
          ),
          [value]
        ),
    },
    {
      Header: 'IP地址：接口',
      width: 110,
      accessor: 'group',
      Cell: ({ value }: { value: string }) =>
        useMemo(() => <Box color="gray.700">{value}</Box>, [value]),
    },
    {
      Header: '协议类型',
      accessor: 'updated_at',
      width: 200,
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Box>
              {formatDateTimeByTimestamp({
                timestamp: value,
              })}
            </Box>
          ),
          [value]
        ),
    },
    // {
    //   Header: '操作',
    //   width: 80,
    //   Cell: ({ row }: Cell<Data>) =>
    //     useMemo(() => {
    //       const { original } = row;

    //       return (
    //         <MoreAction
    //           buttons={[
    //             <MoveSubscriptionButton
    //               selected_ids={[original.ID]}
    //               key="modify"
    //               onSuccess={() => handleRefetch()}
    //             />,
    //             <DeleteDeviceButton
    //               onSuccess={() => {}}
    //               name={[original.name]}
    //               key="delete"
    //               selected_ids={[original.ID]}
    //               refetchData={() => handleRefetch()}
    //             />,
    //           ]}
    //         />
    //       );
    //     }, [row]),
    // },
  ];

  // const noData = pageNum === 1 && !keywords && entities.length === 0;

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        name="代理服务列表"
        hasSearchInput
        // searchInputProps={{
        //   onSearch(value) {
        //     // setKeyWords(value.trim());
        //     console.log(value);
        //   },
        // }}
        buttons={[
          <CreateProxyButton
            key="create"
            type="createButton"
            onSuccess={handleCreatProxySuccess}
          />,
        ]}
        styles={{ title: { fontSize: '14px' } }}
      />
      <Table
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
          body: {
            flex: 1,
          },
        }}
        scroll={{ y: '100%' }}
        columns={columns}
        data={entities}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          false ? (
            <SearchEmpty
              title="没有符合条件的代理服务"
              styles={{
                wrapper: { height: '100%' },
                image: { width: '80px' },
                text: { color: 'gray.500', fontSize: '14px' },
              }}
            />
          ) : (
            <Empty
              type="component"
              title={
                <Text fontSize="14px" lineHeight="24px" color="gray.700">
                  请
                  <CreateProxyButton
                    key="create"
                    type="createText"
                    onSuccess={handleCreatProxySuccess}
                  />
                  代理服务
                </Text>
              }
              styles={{
                wrapper: { width: '100%', height: '100%' },
              }}
            />
          )
        }
      />
    </Flex>
  );
}
