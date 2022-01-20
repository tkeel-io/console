import { Column } from 'react-table';
import { Flex } from '@chakra-ui/react';
import {
  CreateButton,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';

type Data = {
  enableTime: string;
  tenantSpace: string;
  tenantID: string;
  adminAccount: string;
  remark: string;
  userNumber: number;
};

function Index(): JSX.Element {
  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '启用时间',
      accessor: 'enableTime',
      width: 200,
      // disableSortBy: true,
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
      width: 220,
    },
    {
      Header: '备注',
      accessor: 'remark',
    },
    {
      Header: '用户数',
      accessor: 'userNumber',
      width: 100,
    },
  ];

  const data: Data[] = Array.from({ length: 100 }).map((_, index) => {
    return {
      id: index,
      enableTime: '2021-04-32 12:11:11',
      tenantSpace: 'IDC项目',
      tenantID: 'ID_20111010',
      adminAccount: 'esthera@simmmple.com',
      remark: 'IDC项目',
      userNumber: index,
    };
  });

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
        data={data}
        defaultPageSize={20}
        scroll={{ y: '100%' }}
        // onSelect={handleSelect}
        // onSort={handleSort}
      />
    </Flex>
  );
}

export default Index;
