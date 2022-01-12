import React from 'react';
import { Column } from 'react-table';
import { Box, Flex, Text } from '@chakra-ui/react';
import { SearchInput, Table } from '@tkeel/console-components';

type Data = {
  enableTime: string;
  tenantSpace: string;
  tenantID: string;
  adminAccount: string;
  remark: string;
  userNumber: string;
};

const handleSearch = () => {};

function EnablePluginList() {
  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '启用时间',
      accessor: 'enableTime',
    },
    {
      Header: '租户空间',
      accessor: 'tenantSpace',
    },
    {
      Header: '租户ID',
      accessor: 'tenantID',
    },
    {
      Header: '管理员账号',
      accessor: 'adminAccount',
    },
    {
      Header: '备注',
      accessor: 'remark',
    },
    {
      Header: '用户数',
      accessor: 'userNumber',
    },
  ];

  const data: Data[] = Array.from({ length: 10 }).map((_, index) => {
    return {
      id: index,
      enableTime: '2021-04-32 12:11:11',
      tenantSpace: 'IDC项目',
      tenantID: 'ID_20111010',
      adminAccount: 'esthera@simmmple.com',
      remark: 'IDC项目',
      userNumber: '10',
    };
  });
  return (
    <Box padding="12px 20px" backgroundColor="white">
      <Flex
        marginBottom="12px"
        height="32px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="gray.800" fontSize="14px" fontWeight="600">
          启用列表
        </Text>
        <SearchInput width="284px" placeholder="搜索" onSearch={handleSearch} />
      </Flex>
      <Table columns={columns} data={data} />
    </Box>
  );
}

export default EnablePluginList;
