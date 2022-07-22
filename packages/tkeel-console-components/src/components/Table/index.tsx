import {
  Center,
  Flex,
  StyleProps,
  Table as ChakraTable,
} from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import {
  Column,
  ColumnInstance,
  Hooks,
  IdType,
  MetaBase,
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

import SearchEmpty from '../SearchEmpty';
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
  hasKeywords?: boolean;
  hasPagination?: boolean;
  paginationProps?: UsePaginationReturnType & {
    showBoxShadow?: boolean;
  };
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
    headTh?: StyleProps;
    body?: StyleProps;
    bodyTr?: StyleProps;
    bodyTd?: StyleProps;
    pagination?: StyleProps;
  };
  expandRow?: (data: D) => ReactNode;
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
  hasKeywords = false,
  hasPagination = true,
  paginationProps,
  scroll,
  isLoading,
  isShowStripe = false,
  empty,
  onSelect,
  onSort,
  expandRow,
  styles,
}: Props<D>) {
  const canExpandRow = !!expandRow;
  const expandCell = useCallback(
    ({ row }: { row: Row<D> }) =>
      canExpandRow ? (
        <Center
          width="24px"
          height="24px"
          {...row.getToggleRowExpandedProps()}
          cursor="pointer"
        >
          {row.isExpanded ? (
            <ChevronDownFilledIcon color="primary" />
          ) : (
            <ChevronRightFilledIcon />
          )}
        </Center>
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
    hooks.visibleColumns.push(
      (allColumns: ColumnInstance<D>[], meta: MetaBase<D>) =>
        [
          {
            id: 'selection',
            Header: SelectHeader,
            Cell: SelectCell,
            width: 50,
            meta,
          },
          ...allColumns,
        ] as ColumnInstance<D>[]
    );
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
      autoResetExpanded: false,
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
    return (
      <>
        {(() => {
          if (isLoading) {
            return (
              <Loading
                styles={{ wrapper: { height: '100%', ...styles?.loading } }}
              />
            );
          }

          if (data?.length === 0) {
            if (empty) {
              return empty;
            }

            const emptyStyles = { height: '100%', ...styles?.empty };
            if (hasKeywords) {
              return (
                <SearchEmpty title="没有符合条件的数据" sx={emptyStyles} />
              );
            }

            return <Empty sx={emptyStyles} />;
          }

          return (
            <ChakraTable
              {...getTableProps()}
              flex="1"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              {...styles?.table}
            >
              <Head
                headerGroups={headerGroups}
                fixHead={!!scroll?.y}
                canSort={!!onSort}
                isShowStripe={isShowStripe}
                styles={{
                  head: styles?.head,
                  tr: styles?.headTr,
                  th: styles?.headTh,
                }}
              />
              <Body
                page={rows}
                getTableBodyProps={getTableBodyProps}
                prepareRow={prepareRow}
                scroll={scroll}
                isShowStripe={isShowStripe}
                expandRow={expandRow}
                styles={{
                  body: styles?.body,
                  tr: styles?.bodyTr,
                  td: styles?.bodyTd,
                }}
              />
            </ChakraTable>
          );
        })()}
        {hasPagination && (
          <Pagination
            {...paginationProps}
            styles={{ wrapper: { padding: 0, ...styles?.pagination } }}
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
