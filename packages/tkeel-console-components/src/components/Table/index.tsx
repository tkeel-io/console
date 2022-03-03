/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Flex, Table as ChakraTable } from '@chakra-ui/react';
import { useEffect } from 'react';
import {
  ColumnInstance,
  Hooks,
  PluginHook,
  TableOptions,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useDeepCompareEffect } from 'react-use';

import Empty from '@/tkeel-console-components/components/Empty';
import Loading from '@/tkeel-console-components/components/Loading';
import Pagination from '@/tkeel-console-components/components/Pagination';

import Body from './Body';
import Head from './Head';
import { SelectCell, SelectHeader } from './Select';
import { Props } from './types';

function Table<D extends object>({
  columns,
  data = [],
  hasPagination = true,
  paginationProps,
  paginationStyle = {},
  scroll,
  isLoading,
  isShowStripe = false,
  empty = <Empty styles={{ wrapper: { height: '100%' } }} />,
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
      manualSortBy: true,
    } as TableOptions<D>,
    useFlexLayout,
    ...plugins
  );

  const selectedRows = selectedFlatRows?.map((d) => d.original) ?? [];

  useDeepCompareEffect(() => {
    if (onSelect) {
      onSelect({
        isAllRowsSelected,
        selectedRowIds,
        selectedFlatRows: selectedRows,
      });
    }
  }, [isAllRowsSelected, selectedRowIds, selectedRows]);

  useEffect(() => {
    if (onSort) {
      onSort(sortBy);
    }
  }, [sortBy, onSort]);

  const render = () => {
    if (isLoading) {
      return <Loading styles={{ wrapper: { height: '100%' } }} />;
    }

    if (data?.length === 0) {
      return empty;
    }

    return (
      <>
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
            isShowStripe={isShowStripe}
          />
          <Body
            page={rows}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            scroll={scroll}
            isShowStripe={isShowStripe}
          />
        </ChakraTable>
        {hasPagination && (
          <Pagination {...paginationProps} style={paginationStyle} />
        )}
      </>
    );
  };

  return (
    <Flex {...style} flexDirection="column">
      {render()}
    </Flex>
  );
}

export default Table;
