import { useMemo, useState } from 'react';
import { Cell, Column } from 'react-table';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useGlobalProps } from '@tkeel/console-business-components';
import {
  ButtonsHStack,
  Empty,
  PageHeader,
  SearchInput,
  Table,
} from '@tkeel/console-components';
import { usePagination } from '@tkeel/console-hooks';
import { HumanVipFilledIcon } from '@tkeel/console-icons';

import ModifyTenantButton from '@/tkeel-console-plugin-admin-tenants/components/ModifyTenantButton';
import useTenantsQuery, {
  Tenant,
} from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';
// import useWebSocketDemo from '@/tkeel-console-plugin-admin-tenants/hooks/webSockets/useWebSocketDemo';
import CreateTenantButton from '@/tkeel-console-plugin-admin-tenants/pages/Index/components/CreateTenantButton';

export default function Index() {
  const { navigate } = useGlobalProps();
  const [keyWords, setKeyWords] = useState('');
  const pagination = usePagination();
  const { pageNum, pageSize, setPageNum, setTotalSize } = pagination;

  // TODO: tmp
  setTotalSize(10);

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

  const { isLoading, tenants } = useTenantsQuery({ params });

  const LinkToSpaceDetail = () => {
    navigate('/admin-tenants/detail/12029389');
  };

  const columns: ReadonlyArray<Column<Tenant>> = [
    {
      Header: '租户空间',
      accessor: 'title',
      Cell: ({ value }: { value: string }) =>
        useMemo(
          () => (
            <Button size="small" variant="link" onClick={LinkToSpaceDetail}>
              {value}
            </Button>
          ),
          [value]
        ),
    },
    { Header: '租户 ID', accessor: 'tenant_id' },
    { Header: '管理员账号' },
    { Header: '创建时间', accessor: 'created_at' },
    { Header: '备注', accessor: 'remark' },
    { Header: '用户数', accessor: 'num_user' },
    {
      Header: '操作',
      Cell: ({ row }: Cell<Tenant>) =>
        useMemo(() => {
          const { original } = row;

          return (
            <ButtonsHStack>
              <ModifyTenantButton
                variant="link"
                data={original}
                onSuccess={() => {}}
              />
              {/* <ResetPasswordButton data={original} /> */}
              {/* <DeleteUserButton
                data={original}
                onSuccess={handleDeleteUserSuccess}
              /> */}
            </ButtonsHStack>
          );
        }, [row]),
    },
  ];

  return (
    <Flex flexDirection="column" height="100%">
      <PageHeader
        icon={<HumanVipFilledIcon size={26} />}
        name="租户管理"
        desc="管理租户空间，管理租户空间用户。"
      />
      <Flex
        flexDirection="column"
        flex="1"
        marginTop="16px"
        backgroundColor="white"
        boxShadow="xl"
        overflow="hidden"
      >
        <Flex align="center" h="40px" m="16px 24px">
          <Box flex="1" mr="16px">
            <SearchInput
              width="100%"
              placeholder="搜索租户空间、ID、管理员账号、备注"
              onSearch={(value) => {
                setPageNum(1);
                setKeyWords(value.trim());
              }}
            />
          </Box>
          <CreateTenantButton />
        </Flex>
        <Table
          columns={columns}
          data={tenants}
          paginationProps={pagination}
          scroll={{ y: 'scroll' }}
          isLoading={isLoading}
          empty={
            <Empty
              title="暂无空间"
              description="您可前往页面右上角「创建租户空间」"
              styles={{ wrapper: { height: '100%' } }}
            />
          }
          style={{ flex: 1, overflow: 'hidden', backgroundColor: 'whiteAlias' }}
        />
      </Flex>
    </Flex>
  );
}
