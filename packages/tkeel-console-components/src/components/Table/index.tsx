/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from 'react';
import {
  ColumnInstance,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { Flex, Table as ChakraTable } from '@chakra-ui/react';

import Pagination from '@/tkeel-console-components/components/Pagination';

import Body from './Body';
import Head from './Head';
import { SelectCell, SelectHeader } from './Select';
import { ITableInstance, ITableOptions, Props } from './types';

function Table<D extends object>({
  columns,
  data,
  onSelect,
  onSort,
}: Props<D>) {
  const defaultPageSize = 15;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    isAllRowsSelected,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable<D>(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
    } as ITableOptions<D>,
    useFlexLayout,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((allColumns: ColumnInstance<D>[]) => [
        {
          id: 'selection',
          Header: SelectHeader,
          Cell: SelectCell,
          width: 50,
        },
        ...allColumns,
      ]);
    }
  ) as ITableInstance<D>;

  useEffect(() => {
    if (onSelect) {
      onSelect({ isAllRowsSelected, selectedRowIds, selectedFlatRows });
    }
  }, [onSelect, isAllRowsSelected, selectedRowIds, selectedFlatRows]);

  return (
    <Flex flexDirection="column" flex="1" overflow="hidden">
      <ChakraTable
        {...getTableProps()}
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Head headerGroups={headerGroups} onSort={onSort} />
        <Body
          page={page}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
        />
      </ChakraTable>
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

export default Table;
