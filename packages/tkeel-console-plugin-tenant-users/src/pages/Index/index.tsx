import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ButtonsHStack,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

import CreateUserButton from './components/CreateUserButton';
import DeleteUserButton from './components/DeleteUserButton';
import ModifyUserButton from './components/ModifyUserButton';
import ResetPasswordButton from './components/ResetPasswordButton';

import useUsersQuery, {
  User,
} from '@/tkeel-console-plugin-tenant-users/hooks/queries/useUsersQuery';

export default function Index() {
  const [keyWords, setKeyWords] = useState('');
  const queryClient = useQueryClient();

  let params = { page_num: 1, page_size: 10, key_words: '' };
  if (keyWords) {
    params = { ...params, key_words: keyWords };
  }
  const { isLoading, users, queryKey } = useUsersQuery({ params });

  const handleCreateUserSuccess = () => {
    queryClient.invalidateQueries(queryKey);
  };

  const handleModifyUserSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    queryClient.invalidateQueries(queryKey);
  };

  const handleDeleteUserSuccess = () => {
    toast({ status: 'success', title: '删除成功' });
    queryClient.invalidateQueries(queryKey);
  };

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
      Header: '用户名称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'create_at',
      Cell({ value }) {
        return formatDateTimeByTimestamp({ timestamp: value });
      },
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell({ value = [] }) {
        return value.join('，');
      },
    },
    {
      Header: '操作',
      // eslint-disable-next-line react/no-unstable-nested-components
      Cell({ row }: Cell<User>) {
        const { original } = row;

        return (
          <ButtonsHStack>
            <ModifyUserButton
              data={original}
              onSuccess={handleModifyUserSuccess}
            />
            <ResetPasswordButton data={original} />
            <DeleteUserButton
              data={original}
              onSuccess={handleDeleteUserSuccess}
            />
          </ButtonsHStack>
        );
      },
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        searchInputProps={{
          onSearch(value) {
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateUserButton key="create" onSuccess={handleCreateUserSuccess} />,
        ]}
      />
      <Table
        columns={columns}
        data={users}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
      />
    </Flex>
  );
}
