import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import type { CellProps, Column } from 'react-table';

import {
  ButtonsHStack,
  PageHeader,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { RoleTwoToneIcon } from '@tkeel/console-icons';
import { Role, useRolesQuery } from '@tkeel/console-request-hooks';
import { plugin } from '@tkeel/console-utils';

import CreateRoleButton from './components/CreateRoleButton';
import DeleteRoleButton from './components/DeleteRoleButton';
import ModifyRoleButton from './components/ModifyRoleButton';

export default function Roles() {
  const toast = plugin.getPortalToast();
  const documents = plugin.getPortalDocuments();

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
  const { isLoading, isSuccess, total, roles, refetch } = useRolesQuery({
    params,
  });

  if (isSuccess) {
    setTotalSize(total);
  }

  const handleCreateRoleSuccess = () => {
    toast('创建成功', { status: 'success' });
    refetch();
  };

  const columns: ReadonlyArray<Column<Role>> = [
    {
      Header: '角色名称',
      accessor: 'name',
      Cell: useCallback(
        ({ value }: CellProps<Role, Role['name']>) => (
          <Text color="gray.800" fontWeight="600">
            {value}
          </Text>
        ),
        []
      ),
    },
    {
      Header: '描述',
      accessor: 'desc',
    },
    {
      Header: '权限资源',
      accessor: 'permission_list',
      Cell: useCallback(
        ({ value = [] }: CellProps<Role, Role['permission_list']>) => {
          const names = value
            .map(({ permission }) => permission.name)
            .join('，');
          return (
            <Tooltip label={names}>
              <Text noOfLines={1}>{names}</Text>
            </Tooltip>
          );
        },
        []
      ),
    },
    {
      Header: '绑定用户数',
      accessor: 'bind_num',
    },
    {
      Header: '操作',
      Cell: useCallback(
        ({ row }: CellProps<Role>) => {
          const { original } = row;
          const {
            id,
            name,
            desc,
            uneditable,
            permission_list: permissionList,
          } = original;
          const permissionPaths = permissionList.map(({ path }) => path);

          const handleModifyRoleSuccess = () => {
            toast('修改成功', { status: 'success' });
            refetch();
          };

          const handleDeleteRoleSuccess = () => {
            toast('删除成功', { status: 'success' });
            refetch();
          };

          if (uneditable) {
            return null;
          }

          return (
            <ButtonsHStack>
              <ModifyRoleButton
                data={{
                  roleId: id,
                  roleName: name,
                  desc,
                  permissionPaths,
                }}
                onSuccess={handleModifyRoleSuccess}
              />
              <DeleteRoleButton
                data={{ roleId: id, roleName: name }}
                onSuccess={handleDeleteRoleSuccess}
              />
            </ButtonsHStack>
          );
        },
        [refetch, toast]
      ),
    },
  ];

  return (
    <Flex paddingTop="8px" flexDirection="column" height="100%">
      <PageHeader
        icon={<RoleTwoToneIcon />}
        name="角色管理"
        desc="角色管理包括权限策略管理和授权"
        documentsPath={documents.config.paths.tenantGuide.roles}
      />
      <PageHeaderToolbar
        hasSearchInput
        searchInputProps={{
          inputGroupStyle: { flex: 1 },
          inputStyle: {
            backgroundColor: 'gray.50',
          },
          onSearch(value) {
            setPageNum(1);
            setKeyWords(value.trim());
          },
        }}
        buttons={[
          <CreateRoleButton key="create" onSuccess={handleCreateRoleSuccess} />,
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
        data={roles}
        paginationProps={pagination}
        scroll={{ y: '100%' }}
        isLoading={isLoading}
        hasKeywords={!!keywords}
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
