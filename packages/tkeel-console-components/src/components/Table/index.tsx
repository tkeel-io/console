/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from 'react';
import {
  ColumnInstance,
  Hooks,
  PluginHook,
  useFlexLayout,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useDeepCompareEffect } from 'react-use';
import { Flex, Table as ChakraTable } from '@chakra-ui/react';

import Pagination from '@/tkeel-console-components/components/Pagination';

import Body from './Body';
import Head from './Head';
import { SelectCell, SelectHeader } from './Select';
import { ITableInstance, ITableOptions, Props } from './types';

function Table<D extends object>({
  columns,
  data,
  defaultPageSize,
  scroll,
  onSelect,
  onSort,
  style,
}: Props<D>) {
  let plugins: PluginHook<D>[] = [usePagination];
  const pushSelectionColumn = (hooks: Hooks<D>) => {
    hooks.visibleColumns.push((allColumns: ColumnInstance<D>[]) => [
      {
        id: 'selection',
        Header: SelectHeader,
        Cell: SelectCell,
        width: 50,
      },
      ...allColumns,
    ]);
  };

  if (onSelect) {
    plugins = [...plugins, useRowSelect, pushSelectionColumn];
  }

  if (onSort) {
    plugins.unshift(useSortBy);
  }

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
    state: { sortBy, pageIndex, pageSize, selectedRowIds },
  } = useTable<D>(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
      manualSortBy: true,
    } as ITableOptions<D>,
    useFlexLayout,
    ...plugins
  ) as ITableInstance<D>;

  useDeepCompareEffect(() => {
    if (onSelect) {
      onSelect({
        isAllRowsSelected,
        selectedRowIds: Object.keys(selectedRowIds),
        selectedFlatRows,
      });
    }
  }, [onSelect, isAllRowsSelected, selectedRowIds, selectedFlatRows]);

  useEffect(() => {
    if (onSort) {
      onSort(sortBy);
    }
  }, [sortBy, onSort]);

  return (
    <Flex {...style} flexDirection="column">
      <ChakraTable
        {...getTableProps()}
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Head
          headerGroups={headerGroups}
          fixHead={Boolean(scroll?.y)}
          canSort={Boolean(onSort)}
        />
        <Body
          page={page}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          scroll={scroll}
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

Table.defaultProps = {
  defaultPageSize: 15,
  scroll: undefined,
  onSelect: undefined,
  onSort: undefined,
  style: {},
};

export default Table;
