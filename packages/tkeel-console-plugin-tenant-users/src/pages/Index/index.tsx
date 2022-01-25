import { Column } from 'react-table';
import { Flex } from '@chakra-ui/react';
import {
  ActionButtons,
  CreateButton,
  PageHeaderToolbar,
  Table,
} from '@tkeel/console-components';

type Data = {
  user_id: string;
  username: string;
  nick_name: string;
  create_time: string;
  role: string;
};

function Index(): JSX.Element {
  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '用户账号',
      accessor: 'username',
      disableSortBy: false,
    },
    {
      Header: '用户昵称',
      accessor: 'nick_name',
    },
    {
      Header: '创建时间',
      accessor: 'create_time',
    },
    {
      Header: '用户角色',
      accessor: 'role',
    },
    {
      Header: '操作',
      // accessor: 'remark',
      Cell: (
        <ActionButtons
          variant="link"
          data={[
            { key: '1', children: 'a', onClick() {} },
            { key: '2', children: 'b', onClick() {} },
            { key: '3', children: 'c', onClick() {} },
          ]}
        />
      ),
    },
  ];

  const data: Data[] = Array.from({ length: 100 }).map((_, index) => {
    return {
      user_id: `${index}`,
      username: '111',
      nick_name: '222',
      create_time: '2021-04-32 12:11:11',
      role: 'IDC项目',
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
