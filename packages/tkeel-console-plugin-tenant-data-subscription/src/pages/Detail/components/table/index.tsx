import { useMemo, useState } from 'react';
// import { Column } from 'react-table';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  // ButtonsHStack,
  Empty,
  MoreAction,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import useListSubscribeEntitiesQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useListSubscribeEntitiesQuery';
import CreateDeviceButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/CreateDeviceButton';
// import ModifySubscriptionButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Index/components/ModifySubscriptionButton';
// import DeleteRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteRoleButton';
// import DisableButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DisableButton';
// import ModifyRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/ModifyRoleButton';
import DeleteDeviceButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteDeviceButton';

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

function Index({ id }: { id: string }) {
  // console.log('id', id);
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
    // console.log('params', params);
  }
  // const { data } = useListSubscribeEntitiesQuery(id);

  const { data } = useListSubscribeEntitiesQuery({
    params,
    onSuccess(res) {
      const total = res?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  setTotalSize(data?.total || 0);

  // console.log('data', data);

  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '角色名称',
      accessor: 'name',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Text color="gray.800" fontWeight="600">
              {value}
            </Text>
          ),
          [value]
        ),
    },
    {
      Header: '设备状态',
      width: 100,
      accessor: 'status',
    },
    {
      Header: '设备模板',
      accessor: 'template',
    },
    {
      Header: '设备分组',
      accessor: 'group',
    },
    {
      Header: '最后更新时间',
      accessor: 'updated_at',
    },
    // {
    //   Header: '操作',
    //   Cell() {
    //     return (
    //       <MoreAction
    //         buttons={[
    //           <ModifySubscriptionButton
    //             key="modify"
    //             onSuccess={() => {
    //               console.log('123');
    //             }}
    //           />,
    //         ]}
    //       />
    //     );
    //   },
    // },
    {
      Header: '操作',
      width: 80,
      Cell: ({ row }: Cell<Data>) =>
        useMemo(() => {
          const { original } = row;
          // console.log('original', original);

          return (
            <MoreAction
              buttons={[
                <DeleteDeviceButton
                  onSuccess={() => {
                    // console.log('123');
                  }}
                  name={original.name}
                  key="delete"
                  id={original.ID}
                  refetchData={() => {
                    // console.log('123');
                    // refetch();
                  }}
                />,
              ]}
            />
          );
        }, [row]),
    },

    // {
    //   Header: '操作',
    //   Cell({ row }: Cell<Role>) {
    //     const { original } = row;
    //     const { roleName } = original;

    //     useMemo(
    //       () => (
    //         <ButtonsHStack>
    //           <MoreAction buttons={[<DisableButton key="disable" />]} />

    //           <ModifyRoleButton
    //             data={{ role: roleName, plugins: [] }}
    //             onSuccess={handleModifyRoleSuccess}
    //           />
    //           <DeleteRoleButton
    //             data={{ role: roleName }}
    //             onSuccess={handleDeleteRoleSuccess}
    //           />
    //         </ButtonsHStack>
    //       ),
    //       [roleName]
    //     );
    //   },
    // },
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
            onSuccess={handleCreateRoleSuccess}
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
