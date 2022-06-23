import { Flex, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { CellProps, Column } from 'react-table';

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
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

// import LoginUserButton from './LoginUserButton';
import ResetPasswordButton from './ResetPasswordButton';

export default function Users() {
  const { tenantId = '' } = useParams();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;
  const { data: tenant } = useTenantQuery({ tenantId });
  const authType = tenant?.auth_type;
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
  const { isLoading, users } = useUsersQuery({
    tenantId,
    params,
    onSuccess(data) {
      const total = data?.data?.total ?? 0;
      setTotalSize(total);
    },
  });

  const baseColumns: ReadonlyArray<Column<User>> = [
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
          <Text>{value.map(({ name }) => name).join('，')}</Text>
        ),
        []
      ),
    },
  ];

  let columns = [...baseColumns];
  const actionsCell = useCallback(({ row }: CellProps<User>) => {
    const { original } = row;

    return (
      <ButtonsHStack>
        <ResetPasswordButton data={original} />
        {/* <LoginUserButton data={original} /> */}
      </ButtonsHStack>
    );
  }, []);

  if (isInternal) {
    columns = [
      ...columns,
      {
        Header: '操作',
        Cell: actionsCell,
      },
    ];
  }

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeaderToolbar
        name="用户管理"
        hasSearchInput
        styles={{ wrapper: { margin: '4px 0' } }}
        searchInputProps={{
          inputStyle: {
            backgroundColor: 'gray.50',
          },
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
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
            backgroundColor: 'whiteAlias',
          },
        }}
      />
    </Flex>
  );
}
