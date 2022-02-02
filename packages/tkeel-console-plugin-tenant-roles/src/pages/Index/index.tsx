import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ButtonsHStack,
  LinkButton,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';

import CreateRoleButton from './components/CreateRoleButton';
import ModifyRoleButton from './components/ModifyRoleButton';

import useRolesQuery from '@/tkeel-console-plugin-tenant-roles/hooks/queries/useRolesQuery';

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
  const { data, queryKey } = useRolesQuery({ params });
  const roleNames = data?.roles ?? [];
  const roles = roleNames.map((roleName) => ({ roleName }));

  const handleCreateRoleSuccess = () => {
    toast({ status: 'success', title: '创建成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const handleModifyRoleSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const columns: ReadonlyArray<Column<Role>> = [
    {
      Header: '角色名称',
      accessor: 'roleName',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ value }: { value: string }) {
        return (
          <Text color="gray.800" fontWeight="600">
            {value}
          </Text>
        );
      },
    },
    {
      Header: '描述',
      // accessor: '',
    },
    {
      Header: '权限资源',
      // accessor: '',
    },
    {
      Header: '绑定用户数',
      // accessor: '',
    },
    {
      Header: '操作',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ row }: Cell<Role>) {
        const { original } = row;
        const { roleName } = original;

        return (
          <ButtonsHStack>
            <ModifyRoleButton
              data={{ role: roleName, plugins: [] }}
              onSuccess={handleModifyRoleSuccess}
            />
            <LinkButton>删除</LinkButton>
          </ButtonsHStack>
        );
      },
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="角色管理"
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
        defaultPageSize={20}
        scroll={{ y: '100%' }}
      />
    </Flex>
  );
}

export default Index;
