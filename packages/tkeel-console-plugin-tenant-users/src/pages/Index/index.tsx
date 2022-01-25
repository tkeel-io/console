import { Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ActionButtons,
  CreateButton,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { formatDateTime } from '@tkeel/console-utils';

import CreateUserModal from './components/CreateUserModal';

// import ModifyUserModal from './components/ModifyUserModal';
import useUsersQuery, {
  User,
} from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';

function Index(): JSX.Element {
  const { data } = useUsersQuery();
  const users = data?.users ?? [];

  const columns: ReadonlyArray<Column<User>> = [
    {
      Header: '用户账号',
      accessor: 'username',
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
      Header: '用户昵称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'create_at',
      Cell({ value }) {
        return formatDateTime({ date: value });
      },
    },
    {
      Header: '用户角色',
      accessor: 'roles',
    },
    {
      Header: '操作',
      Cell: (
        <ActionButtons
          variant="link"
          data={[
            { key: 'edit', children: '编辑', onClick() {} },
            { key: 'reset-password', children: '重置密码', onClick() {} },
            { key: 'delete', children: '删除', onClick() {} },
          ]}
        />
      ),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        searchInputProps={{ onSearch() {} }}
        buttons={[<CreateButton key="add">创建用户</CreateButton>]}
      />
      <Table
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        columns={columns}
        data={users}
        defaultPageSize={20}
        scroll={{ y: '100%' }}
      />
      <CreateUserModal />
    </Flex>
  );
}

export default Index;
