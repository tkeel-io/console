import { Flex, Text, Theme, useTheme } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';

import {
  ButtonsHStack,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { User, useUsersPluginQuery } from '@tkeel/console-request-hooks';
import {
  formatDateTimeByTimestamp,
  getLocalTenantInfo,
} from '@tkeel/console-utils';

import CreateUserButton from './components/CreateUserButton';
import DeleteUserButton from './components/DeleteUserButton';
import ModifyUserButton from './components/ModifyUserButton';
import ResetPasswordButton from './components/ResetPasswordButton';

export default function Users() {
  const { colors }: Theme = useTheme();
  const { tenant_id: tenantId } = getLocalTenantInfo();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
  };
  if (keyWords) {
    params = { ...params, key_words: keyWords };
  }
  const { isLoading, users, refetch } = useUsersPluginQuery({
    tenantId,
    params,
    onSuccess(data) {
      const total = data?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  const handleCreateUserSuccess = () => {
    toast({ status: 'success', title: '创建成功' });
    refetch();
  };

  const handleModifyUserSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    refetch();
  };

  const handleDeleteUserSuccess = () => {
    toast({ status: 'success', title: '删除成功' });
    refetch();
  };

  const columns: ReadonlyArray<Column<User>> = [
    {
      Header: '用户账号',
      accessor: 'username',
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
      Header: '用户名称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'created_at',
      Cell({ value }) {
        return value ? formatDateTimeByTimestamp({ timestamp: value }) : '';
      },
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell({ value = [] }) {
        return value.map(({ name }) => name).join('，');
      },
    },
    {
      Header: '操作',
      Cell: ({ row }: Cell<User>) =>
        useMemo(() => {
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
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        searchInputProps={{
          inputStyle: { backgroundColor: colors.white },
          onSearch(value) {
            setPageNum(1);
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
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        style={{
          flex: 1,
          overflow: 'hidden',
          padding: '12px 20px 0',
          backgroundColor: 'whiteAlias',
        }}
      />
    </Flex>
  );
}
