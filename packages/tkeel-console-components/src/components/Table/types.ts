import {
  HeaderGroup,
  IdType,
  Row,
  TableHeaderProps,
  TableInstance,
  TableOptions,
  TableSortByToggleProps,
  TableState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseRowSelectInstanceProps,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnProps,
  UseTableOptions,
} from 'react-table';

type OnSelectProps<D extends object> = {
  isAllRowsSelected: boolean;
  selectedRowIds: Record<IdType<D>, boolean>;
  selectedFlatRows: Row<D>[];
};

export type OnSortProps<D extends object> = {
  id: IdType<D>;
  isSorted: boolean;
  isSortedDesc: boolean;
};

export interface Props<D extends object> extends UseTableOptions<D> {
  onSelect: ({
    isAllRowsSelected,
    selectedRowIds,
    selectedFlatRows,
  }: OnSelectProps<D>) => void | undefined;
  onSort: ({ id, isSorted, isSortedDesc }: OnSortProps<D>) => void | undefined;
}

export interface ITableState<D extends object>
  extends TableState<D>,
    UseRowSelectState<D>,
    UsePaginationState<D> {}

export interface IHeaderGroup<D extends object>
  extends HeaderGroup<D>,
    UseSortByColumnProps<D> {
  headers: Array<IHeaderGroup<D>>;
}

export interface ITableHeaderProps
  extends TableHeaderProps,
    TableSortByToggleProps {}

export interface ITableInstance<D extends object>
  extends TableInstance<D>,
    UseRowSelectInstanceProps<D>,
    UsePaginationInstanceProps<D> {
  headerGroups: IHeaderGroup<D>[];
  state: ITableState<D>;
}

export interface IRow<D extends object>
  extends Row<D>,
    UseRowSelectRowProps<D> {}

export interface ITableOptions<D extends object>
  extends TableOptions<D>,
    UsePaginationOptions<D> {}
