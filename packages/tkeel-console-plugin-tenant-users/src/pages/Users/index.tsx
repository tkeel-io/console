import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import type { CellProps, Column } from 'react-table';

import {
  ButtonsHStack,
  PageHeader,
  PageHeaderToolbar,
  Table,
  Tooltip,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { CrowdTwoToneIcon } from '@tkeel/console-icons';
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

  const columns: ReadonlyArray<Column<User>> = [
    {
      Header: '用户账号',
      accessor: 'username',
      Cell: useCallback(
        ({ value }: CellProps<User, User['username']>) => (
          <Text color="gray.800" fontWeight="600">
            {value}
          </Text>
        ),
        []
      ),
    },
    {
      Header: '用户名称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'created_at',
      Cell: useCallback(
        ({ value }: CellProps<User, User['created_at']>) =>
          value ? (
            <Text>{formatDateTimeByTimestamp({ timestamp: value })}</Text>
          ) : null,
        []
      ),
    },
    {
      Header: '用户角色',
      accessor: 'roles',
      Cell: useCallback(
        ({ value = [] }: CellProps<User, User['roles']>) => (
          <Tooltip label={value.map(({ name }) => name).join('，')}>
            <Text noOfLines={1}>
              {value.map(({ name }) => name).join('，')}
            </Text>
          </Tooltip>
        ),
        []
      ),
    },
    {
      Header: '操作',
      Cell: useCallback(
        ({ row }: CellProps<User>) => {
          const { original } = row;

          const handleModifyUserSuccess = () => {
            toast('修改成功', { status: 'success' });
            refetch();
          };

          const handleDeleteUserSuccess = () => {
            toast('删除成功', { status: 'success' });
            refetch();
          };

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
        },
        [authType, isInternal, refetch, toast]
      ),
    },
  ];

  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<CrowdTwoToneIcon />}
        name="用户管理"
        desc="管理用户包括新增和删除用户，查看平台用户账号、基本信息和状态，编辑角色权限和密码重置。"
        documentsPath={documents.config.paths.tenantGuide.users}
      />
      <PageHeaderToolbar
        hasSearchInput
        searchInputProps={{
          inputGroupStyle: { flex: 1 },
          inputStyle: { backgroundColor: 'gray.50' },
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
        styles={{
          wrapper: {
            marginTop: '16px',
            height: '56px',
            padding: '0 20px',
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            backgroundColor: 'gray.100',
          },
        }}
      />
      <Table
        columns={columns}
        data={users}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        hasKeywords={!!keyWords}
        styles={{
          wrapper: {
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'whiteAlias',
          },
          headTr: {
            height: '40px',
            backgroundColor: 'gray.50',
          },
          pagination: {
            padding: '0 20px',
            backgroundColor: 'gray.50',
          },
        }}
      />
    </Flex>
  );
}
