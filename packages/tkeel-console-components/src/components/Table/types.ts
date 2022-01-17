import {
  HeaderGroup,
  IdType,
  Row,
  SortingRule,
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
  UseSortByState,
  UseTableOptions,
} from 'react-table';
import { StyleProps } from '@chakra-ui/react';

type OnSelectProps<D extends object> = {
  isAllRowsSelected: boolean;
  selectedRowIds: IdType<D>[];
  selectedFlatRows: Row<D>[];
};

export interface Props<D extends object> extends UseTableOptions<D> {
  defaultPageSize?: number;
  scroll?: {
    y: string;
  };
  onSelect?: ({
    isAllRowsSelected,
    selectedRowIds,
    selectedFlatRows,
  }: OnSelectProps<D>) => void;
  onSort?: (sortBy: Array<SortingRule<D>>) => void;
  style?: StyleProps;
}

export interface ITableState<D extends object>
  extends TableState<D>,
    UseSortByState<D>,
    UsePaginationState<D>,
    UseRowSelectState<D> {}

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
