import { Box, Flex, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
// import { Column } from 'react-table';
import { Cell, Column } from 'react-table';

import {
  // ButtonsHStack,
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  WebcamTwoToneIcon,
  WifiFilledIcon,
  WifiOffFilledIcon,
} from '@tkeel/console-icons';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import useListSubscribeEntitiesQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeEntitiesQuery';
import CreateDeviceButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/CreateDeviceButton';
import DeleteDeviceButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteDeviceButton';
// import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';
// import DeleteRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteRoleButton';
// import DisableButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DisableButton';
// import ModifyRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/ModifyRoleButton';
import MoveSubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/MoveSubscriptionButton';

// type Role = {
//   roleName: string;
// };
type Data = {
  ID: string;
  group: string;
  name: string;
  status: string;
  template: string;
  updated_at: string;
};

const handleCreateRoleSuccess = () => {
  toast({ status: 'success', title: '创建成功' });
  // queryClient.invalidateQueries(queryKey);
};

// const handleModifyRoleSuccess = () => {
//   toast({ status: 'success', title: '修改成功' });
//   // queryClient.invalidateQueries(queryKey);
// };

// const handleDeleteRoleSuccess = () => {
//   toast({ status: 'success', title: '删除成功' });
//   // queryClient.invalidateQueries(queryKey);
// };

const connectionIcon = {
  offline: <WifiOffFilledIcon key="wifi-off" />,
  online: <WifiFilledIcon key="wifi" />,
};

function Index({ id, title }: { id: string; title: string }) {
  const [keywords, setKeyWords] = useState('');

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;

  // const pagination = usePagination();
  // const { setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
    id: '',
  };
  params = { ...params, id };

  if (keywords) {
    params = { ...params, key_words: keywords };
  }
  // const { data } = useListSubscribeEntitiesQuery(id);

  const { data, isLoading, refetch } = useListSubscribeEntitiesQuery({
    params,
    onSuccess(res) {
      const total = res?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  // setTotalSize(data?.total || 0);

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '角色名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Flex alignItems="center" justifyContent="space-between">
              <WebcamTwoToneIcon />
              <Text color="gray.800" fontWeight="600" marginLeft="14px">
                {value}
              </Text>
            </Flex>
          ),
          [value]
        ),
    },
    {
      Header: '设备状态',
      width: 100,
      accessor: 'status',
      Cell: ({ value }: { value: string }) =>
        useMemo(() => <Box>{connectionIcon[value]}</Box>, [value]),
    },
    {
      Header: '设备模板',
      width: 110,
      accessor: 'template',
    },
    {
      Header: '设备分组',
      width: 110,
      accessor: 'group',
    },
    {
      Header: '最后更新时间',
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

    {
      Header: '操作',
      width: 80,
      Cell: ({ row }: Cell<Data>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <MoreAction
              buttons={[
                <MoveSubscriptionButton
                  selected_ids={[original.ID]}
                  key="modify"
                  onSuccess={() => {
                    refetch();
                  }}
                />,
                <DeleteDeviceButton
                  onSuccess={() => {}}
                  name={[original.name]}
                  key="delete"
                  selected_ids={[original.ID]}
                  refetchData={() => {
                    refetch();
                  }}
                />,
              ]}
            />
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%" margin="0 20px">
      <PageHeaderToolbar
        // name={
        //   <MoreAction
        //     buttons={[
        //       <MoveSubscriptionButton
        //         selected_ids={['1', '2']}
        //         key="modify"
        //         onSuccess={() => {
        //           refetch();
        //         }}
        //       />,
        //       <DeleteDeviceButton
        //         onSuccess={() => {}}
        //         name={['1']}
        //         key="delete"
        //         selected_ids={['1']}
        //         refetchData={() => {
        //           refetch();
        //         }}
        //       />,
        //     ]}
        //   />
        // }

        name="订阅设备"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateDeviceButton
            key="create"
            onSuccess={() => {
              refetch();
            }}
          />,
        ]}
      />
      <Table
        style={{ flex: 1, overflow: 'hidden' }}
        columns={columns}
        data={data?.data || []}
        // hasPagination
        scroll={{ y: '100%' }}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          <Empty
            description={
              <Box>
                <Box display="inline" color="gray.600" fontWeight="500">
                  [{title}]
                </Box>
                暂无设备,可手动添加
              </Box>
            }
            styles={{
              wrapper: { height: '100%' },
              content: { marginTop: '10px' },
            }}
            title=""
            content={
              <Box mt="20px">
                <CreateDeviceButton
                  key="create"
                  onSuccess={handleCreateRoleSuccess}
                />
              </Box>
            }
          />
        }
      />
    </Flex>
  );
}

export default Index;
