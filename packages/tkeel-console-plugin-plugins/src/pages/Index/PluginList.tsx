import React from 'react';
import { Column, TableInstance, usePagination, useTable } from 'react-table';
import { Flex, Grid } from '@chakra-ui/react';

import Card from './Card';
import Pagination from './Pagination';

type Data = {
  id: string;
};

function Table({ columns, data }: { columns: Column<Data>[]; data: Data[] }) {
  const {
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: TableInstance<Data> = useTable<Data>(
    {
      columns,
      data,
      initialState: { pageSize: 12 },
    },
    usePagination
  );

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      flex="1"
      overflow="hidden"
    >
      <Grid
        margin="20px 24px"
        templateColumns="repeat(4, 1fr)"
        gap="8px"
        overflowY="auto"
      >
        {page.map(({ id }) => (
          <Card key={id} />
        ))}
      </Grid>
      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalSize={data.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
      />
    </Flex>
  );
}

function PluginList() {
  const columns: Column<Data>[] = [
    {
      Header: 'ID',
      accessor: 'id',
    },
  ];

  const data = Array.from({ length: 1000 }).map((_, index) => {
    return {
      id: index.toString(),
    };
  });

  return <Table columns={columns} data={data} />;
}

export default PluginList;
