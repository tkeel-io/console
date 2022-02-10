/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from 'react';
import {
  ColumnInstance,
  Hooks,
  PluginHook,
  useFlexLayout,
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
import { Props, TableInstanceExtended, TableOptionsExtended } from './types';

function Table<D extends object>({
  columns,
  data,
  defaultPageSize = 15,
  hasPagination = true,
  paginationProps = {
    pageNum: 1,
    pageSize: 1,
    totalSize: 0,
    canPreviousPage: false,
    canNextPage: false,
    setPageNum: (pageNum: number) => {
      console.log('pageNum', pageNum);
    },
    setPageSize: (pageSize: number) => {
      console.log(pageSize);
    },
    setTotalSize: (totalSize: number) => {
      console.log(totalSize);
    },
  },
  scroll,
  onSelect,
  onSort,
  style = {},
}: Props<D>) {
  let plugins: PluginHook<D>[] = [];
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
    plugins = [useRowSelect, pushSelectionColumn];
  }

  if (onSort) {
    plugins.unshift(useSortBy);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    isAllRowsSelected,
    state: { sortBy, selectedRowIds },
  } = useTable<D>(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
      manualSortBy: true,
    } as TableOptionsExtended<D>,
    useFlexLayout,
    ...plugins
  ) as TableInstanceExtended<D>;

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
          page={rows}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          scroll={scroll}
        />
      </ChakraTable>
      {hasPagination && <Pagination {...paginationProps} />}
    </Flex>
  );
}

export default Table;
