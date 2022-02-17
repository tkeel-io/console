import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ButtonsHStack,
  MoreAction,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';

import useRolesQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/queries/useRolesQuery';
import CreateRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/CreateRoleButton';
import DeleteRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DeleteRoleButton';
import DisableButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/DisableButton';
import ModifyRoleButton from '@/tkeel-console-plugin-tenant-data-subscription/pages/Detail/components/ModifyRoleButton';

type Role = {
  roleName: string;
};

function Index() {
  const [keywords, setKeyWords] = useState('');
  const queryClient = useQueryClient();

  let params = {};
  if (keywords) {
    params = { ...params, key_words: keywords };
  }
  const { roles: roleNames, queryKey } = useRolesQuery({ params });
  const roles = roleNames.map((roleName) => ({ roleName }));

  const handleCreateRoleSuccess = () => {
    toast({ status: 'success', title: '创建成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const handleModifyRoleSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const handleDeleteRoleSuccess = () => {
    toast({ status: 'success', title: '删除成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const columns: ReadonlyArray<Column<Role>> = [
    {
      Header: '角色名称',
      accessor: 'roleName',
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
      // accessor: '',
    },
    {
      Header: '设备模板',
      // accessor: '',
    },
    {
      Header: '设备分组',
      // accessor: '',
    },
    {
      Header: '最后更新时间',
    },
    {
      Header: '操作',
      Cell({ row }: Cell<Role>) {
        const { original } = row;
        const { roleName } = original;

        // return (
        //   <ButtonsHStack>
        // <ModifyRoleButton
        //   data={{ role: roleName, plugins: [] }}
        //   onSuccess={handleModifyRoleSuccess}
        // />
        // <DeleteRoleButton
        //   data={{ role: roleName }}
        //   onSuccess={handleDeleteRoleSuccess}
        // />
        //   </ButtonsHStack>
        // );

        useMemo(
          () => (
            <ButtonsHStack>
              <MoreAction buttons={[<DisableButton key="disable" />]} />

              <ModifyRoleButton
                data={{ role: roleName, plugins: [] }}
                onSuccess={handleModifyRoleSuccess}
              />
              <DeleteRoleButton
                data={{ role: roleName }}
                onSuccess={handleDeleteRoleSuccess}
              />
            </ButtonsHStack>
          ),
          [roleName]
        );
      },
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
          <CreateRoleButton key="create" onSuccess={handleCreateRoleSuccess} />,
        ]}
      />
      <Table
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={roles}
        hasPagination={false}
        scroll={{ y: '100%' }}
      />
    </Flex>
  );
}

export default Index;
