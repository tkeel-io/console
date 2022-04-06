import { Box, Flex, StyleProps, Table as ChakraTable } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import {
  Column,
  ColumnInstance,
  Hooks,
  IdType,
  PluginHook,
  Row,
  SortingRule,
  TableOptions,
  useExpanded,
  useFlexLayout,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useDeepCompareEffect } from 'react-use';

import {
  ChevronDownFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';
import { UsePaginationReturnType } from '@tkeel/console-types';

import Empty from '@/tkeel-console-components/components/Empty';
import Loading from '@/tkeel-console-components/components/Loading';
import Pagination from '@/tkeel-console-components/components/Pagination';

import Body from './Body';
import Head from './Head';
import { SelectCell, SelectHeader } from './Select';

type OnSelectProps<D extends object> = {
  isAllRowsSelected: boolean;
  selectedRowIds: Record<IdType<D>, boolean>;
  selectedFlatRows: D[];
};

interface Props<D extends object> {
  columns: ReadonlyArray<Column<D>>;
  data: readonly D[];
  hasPagination?: boolean;
  paginationProps?: UsePaginationReturnType;
  paginationStyle?: StyleProps;
  scroll?: {
    y: string;
  };
  isLoading?: boolean;
  isShowStripe?: boolean;
  empty?: ReactNode;
  styles?: {
    wrapper?: StyleProps;
    loading?: StyleProps;
    empty?: StyleProps;
    table?: StyleProps;
    head?: StyleProps;
    headTr?: StyleProps;
    body?: StyleProps;
    bodyTr?: StyleProps;
    pagination?: StyleProps;
  };
  canExpandRow?: boolean;
  onSelect?: ({
    isAllRowsSelected,
    selectedRowIds,
    selectedFlatRows,
  }: OnSelectProps<D>) => void;
  onSort?: (sortBy: Array<SortingRule<D>>) => void;
}

function Table<D extends object>({
  columns,
  data = [],
  hasPagination = true,
  paginationProps,
  scroll,
  isLoading,
  isShowStripe = false,
  empty,
  onSelect,
  onSort,
  canExpandRow = false,
  styles,
}: Props<D>) {
  const expandCell = useCallback(
    ({ row }: { row: Row<D> }) =>
      canExpandRow ? (
        <Box {...row.getToggleRowExpandedProps()} cursor="pointer">
          {row.isExpanded ? (
            <ChevronDownFilledIcon />
          ) : (
            <ChevronRightFilledIcon />
          )}
        </Box>
      ) : null,
    [canExpandRow]
  );

  const newColumns: readonly Column<D>[] = useMemo(
    () =>
      canExpandRow
        ? [
            {
              id: 'expander',
              Cell: expandCell,
              width: 50,
            },
            ...columns,
          ]
        : columns,
    [canExpandRow, expandCell, columns]
  );

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

  if (canExpandRow) {
    plugins.unshift(useExpanded);
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
      columns: newColumns,
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
      return (
        <Loading styles={{ wrapper: { height: '100%', ...styles?.loading } }} />
      );
    }

    if (data?.length === 0) {
      return (
        empty || (
          <Empty styles={{ wrapper: { height: '100%', ...styles?.empty } }} />
        )
      );
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
            styles={{ head: styles?.head, tr: styles?.headTr }}
          />
          <Body
            page={rows}
            getTableBodyProps={getTableBodyProps}
            prepareRow={prepareRow}
            scroll={scroll}
            isShowStripe={isShowStripe}
            styles={{ body: styles?.body, tr: styles?.bodyTr }}
          />
        </ChakraTable>
        {hasPagination && (
          <Pagination
            {...paginationProps}
            styles={{ wrapper: styles?.pagination }}
          />
        )}
      </>
    );
  };

  return (
    <Flex {...styles?.wrapper} flexDirection="column">
      {render()}
    </Flex>
  );
}

export default Table;
