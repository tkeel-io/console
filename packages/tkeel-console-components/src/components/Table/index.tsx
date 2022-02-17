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

import Empty from '@/tkeel-console-components/components/Empty';
import Loading from '@/tkeel-console-components/components/Loading';
import Pagination from '@/tkeel-console-components/components/Pagination';

import Body from './Body';
import Head from './Head';
import { SelectCell, SelectHeader } from './Select';
import { Props, TableInstanceExtended, TableOptionsExtended } from './types';

function Table<D extends object>({
  columns,
  data = [],
  defaultPageSize = 15,
  hasPagination = true,
  paginationProps,
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
            isShowStripe
          />
        </ChakraTable>
        {hasPagination && <Pagination {...paginationProps} />}
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
