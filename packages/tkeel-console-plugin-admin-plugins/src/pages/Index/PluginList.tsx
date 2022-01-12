import React from 'react';
import { Column, usePagination, useTable } from 'react-table';
import { Flex, Grid } from '@chakra-ui/react';
import { Pagination } from '@tkeel/console-components';

import Card from './Card';

export type Data = {
  id: string;
};

function PluginList({
  columns,
  data,
}: {
  columns: Column<Data>[];
  data: Data[];
}) {
  const defaultPageSize = 20;
  const {
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<Data>(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
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

export default PluginList;
