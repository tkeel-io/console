import { Flex, Text, Theme, useTheme } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { CellProps, Column } from 'react-table';

import {
  ButtonsHStack,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import {
  User,
  useTenantQuery,
  useUsersQuery,
} from '@tkeel/console-request-hooks';
import {
  formatDateTimeByTimestamp,
  getLocalTenantInfo,
  plugin,
} from '@tkeel/console-utils';

import CreateUserButton from './components/CreateUserButton';
import DeleteUserButton from './components/DeleteUserButton';
import LoginUserButton from './components/LoginUserButton';
import ModifyUserButton from './components/ModifyUserButton';
import ResetPasswordButton from './components/ResetPasswordButton';

export default function Users() {
  const toast = plugin.getPortalToast();
  const documents = plugin.getPortalDocuments();

  const { colors }: Theme = useTheme();
  const { tenant_id: tenantId } = getLocalTenantInfo();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  const { data: tenantInfo } = useTenantQuery({ tenantId });
  const authType = tenantInfo?.auth_type ?? 'external';
  const isInternal = authType === 'internal';

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
  const { isLoading, users, refetch } = useUsersQuery({
    tenantId,
    params,
    onSuccess(data) {
      const total = data?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  const handleCreateUserSuccess = () => {
    toast('创建成功', { status: 'success' });
    refetch();
  };

  const handleModifyUserSuccess = () => {
    toast('修改成功', { status: 'success' });
    refetch();
  };

  const handleDeleteUserSuccess = () => {
    toast('删除成功', { status: 'success' });
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
      Cell: ({ value }) =>
        useMemo(() => {
          return value ? (
            <Text>{formatDateTimeByTimestamp({ timestamp: value })}</Text>
          ) : null;
        }, [value]),
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell: ({ value = [] }) =>
        useMemo(
          () => <Text>{value.map(({ name }) => name).join('，')}</Text>,
          [value]
        ),
    },
    {
      Header: '操作',
      Cell: ({ row }: CellProps<User>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <ButtonsHStack>
              <ModifyUserButton
                authType={authType}
                data={original}
                onSuccess={handleModifyUserSuccess}
              />
              {isInternal && <ResetPasswordButton data={original} />}
              <LoginUserButton data={original} />
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
        documentsPath={documents.config.paths.tenantGuide.users}
        hasSearchInput
        searchInputProps={{
          inputStyle: { backgroundColor: colors.white },
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          isInternal && (
            <CreateUserButton
              key="create"
              onSuccess={handleCreateUserSuccess}
            />
          ),
        ]}
      />
      <Table
        columns={columns}
        data={users}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        isShowStripe
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            padding: '12px 20px 0',
            backgroundColor: 'whiteAlias',
          },
        }}
      />
    </Flex>
  );
}
