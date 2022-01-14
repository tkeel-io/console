import { useCallback } from 'react';
import { Column, IdType, Row } from 'react-table';
import { Flex, Text } from '@chakra-ui/react';
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

const handleSort = ({
  id,
  isSorted,
  isSortedDesc,
}: {
  id: IdType<Data>;
  isSorted: boolean;
  isSortedDesc: boolean;
}) => {
  // eslint-disable-next-line no-console
  console.log('id, isSorted, isSortedDesc', id, isSorted, isSortedDesc);
};

function EnablePluginList() {
  const handleSelect = useCallback(
    ({
      isAllRowsSelected,
      selectedRowIds,
      selectedFlatRows,
    }: {
      isAllRowsSelected: boolean;
      selectedRowIds: Record<IdType<Data>, boolean>;
      selectedFlatRows: Row<Data>[];
    }) => {
      // eslint-disable-next-line no-console
      console.log(
        'isAllRowsSelected, selectedRowIds, selectedFlatRows',
        isAllRowsSelected,
        selectedRowIds,
        selectedFlatRows
      );
    },
    []
  );
  const columns: ReadonlyArray<Column<Data>> = [
    {
      Header: '启用时间',
      accessor: 'enableTime',
      width: 200,
      disableSortBy: true,
      // defaultCanSort: false,
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
      userNumber: '10',
    };
  });

  return (
    <Flex
      flexDirection="column"
      height="100%"
      padding="12px 20px"
      backgroundColor="white"
    >
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
      <Table
        columns={columns}
        data={data}
        onSelect={handleSelect}
        onSort={handleSort}
      />
    </Flex>
  );
}

export default EnablePluginList;
