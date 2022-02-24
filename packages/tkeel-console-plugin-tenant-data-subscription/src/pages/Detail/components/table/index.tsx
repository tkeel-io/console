import { useMemo, useState } from 'react';
// import { useQueryClient } from 'react-query';
// import { Column } from 'react-table';
import { Cell, Column } from 'react-table';
import { Box, Flex, Text } from '@chakra-ui/react';
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

function Index({ id }: { id: string }) {
  const [keywords, setKeyWords] = useState('');

  const pagination = usePagination();
  const { pageNum, pageSize, setTotalSize } = pagination;

  // const pagination = usePagination();
  // const { setTotalSize } = pagination;

  // const queryClient = useQueryClient();

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

  setTotalSize(data?.total || 0);

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
                  selected_ids={original.ID}
                  key="modify"
                  onSuccess={() => {
                    refetch();
                  }}
                />,
                <DeleteDeviceButton
                  onSuccess={() => {}}
                  name={original.name}
                  key="delete"
                  id={original.ID}
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
    <Flex flexDirection="column" height="100%" padding="0 20px">
      <PageHeaderToolbar
        name="订阅设备"
        // TODO: useless search
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
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={data?.data || []}
        // hasPagination
        scroll={{ y: '100%' }}
        isShowStripe
        isLoading={isLoading}
        paginationProps={pagination}
        empty={
          <Empty
            description="[IDC设备分组订阅] 暂无设备,可手动添加"
            styles={{
              wrapper: { height: '100%' },
              content: { marginTop: '10px' },
            }}
            title=""
            content={
              <CreateDeviceButton
                key="create"
                onSuccess={handleCreateRoleSuccess}
              />
            }
          />
        }
      />
    </Flex>
  );
}

export default Index;
