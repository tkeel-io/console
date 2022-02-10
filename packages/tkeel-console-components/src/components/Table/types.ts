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
import { UsePaginationReturnType } from '@tkeel/console-types';

type OnSelectProps<D extends object> = {
  isAllRowsSelected: boolean;
  selectedRowIds: IdType<D>[];
  selectedFlatRows: Row<D>[];
};

export interface Props<D extends object> extends UseTableOptions<D> {
  defaultPageSize?: number;
  hasPagination?: boolean;
  paginationProps?: UsePaginationReturnType;
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

export interface TableStateExtended<D extends object>
  extends TableState<D>,
    UseSortByState<D>,
    UsePaginationState<D>,
    UseRowSelectState<D> {}

export interface HeaderGroupExtended<D extends object>
  extends HeaderGroup<D>,
    UseSortByColumnProps<D> {
  headers: Array<HeaderGroupExtended<D>>;
}

export interface TableHeaderPropsExtended
  extends TableHeaderProps,
    TableSortByToggleProps {}

export interface TableInstanceExtended<D extends object>
  extends TableInstance<D>,
    UseRowSelectInstanceProps<D>,
    UsePaginationInstanceProps<D> {
  headerGroups: HeaderGroupExtended<D>[];
  state: TableStateExtended<D>;
}

export interface RowExtended<D extends object>
  extends Row<D>,
    UseRowSelectRowProps<D> {}

export interface TableOptionsExtended<D extends object>
  extends TableOptions<D>,
    UsePaginationOptions<D> {}
