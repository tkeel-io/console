import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
import {
  ButtonsHStack,
  PageHeaderToolbar,
  Table,
  toast,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';

import CreateRoleButton from './components/CreateRoleButton';
import DeleteRoleButton from './components/DeleteRoleButton';
import ModifyRoleButton from './components/ModifyRoleButton';

import useRolesQuery, {
  Role,
} from '@/tkeel-console-plugin-tenant-roles/hooks/queries/useRolesQuery';

export default function Roles() {
  const [keywords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  let params = {
    page_num: pageNum,
    page_size: pageSize,
    order_by: 'created_at',
    is_descending: true,
    key_words: '',
  };
  if (keywords) {
    params = { ...params, key_words: keywords };
  }
  const { isLoading, total, roles, refetch } = useRolesQuery({ params });
  setTotalSize(total);

  const handleCreateRoleSuccess = () => {
    toast({ status: 'success', title: '创建成功' });
    refetch();
  };

  const handleModifyRoleSuccess = () => {
    toast({ status: 'success', title: '修改成功' });
    refetch();
  };

  const handleDeleteRoleSuccess = () => {
    toast({ status: 'success', title: '删除成功' });
    refetch();
  };

  const columns: ReadonlyArray<Column<Role>> = [
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
      Header: '描述',
      accessor: 'desc',
    },
    {
      Header: '权限资源',
      // accessor: '',
    },
    {
      Header: '绑定用户数',
      accessor: 'bind_num',
    },
    {
      Header: '操作',
      Cell({ row }: Cell<Role>) {
        const { original } = row;
        const { id, name, desc, permission_list: permissionList } = original;

        return useMemo(
          () => (
            <ButtonsHStack>
              <ModifyRoleButton
                data={{
                  roleId: id,
                  roleName: name,
                  desc,
                  permissionList,
                }}
                onSuccess={handleModifyRoleSuccess}
              />
              <DeleteRoleButton
                data={{ roleId: id, roleName: name }}
                onSuccess={handleDeleteRoleSuccess}
              />
            </ButtonsHStack>
          ),
          [id, name, permissionList, desc]
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
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateRoleButton key="create" onSuccess={handleCreateRoleSuccess} />,
        ]}
      />
      <Table
        columns={columns}
        data={roles}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
      />
    </Flex>
  );
}
