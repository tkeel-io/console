import {
  Column,
  TableInstance,
  TableOptions,
  TableState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
} from 'react-table';

export type Props<D extends Record<string, unknown>> = {
  columns: ReadonlyArray<Column<D>>;
  data: readonly D[];
};

export interface ITableState<D extends object>
  extends TableState<D>,
    UsePaginationState<D> {}

export interface ITableInstance<D extends object>
  extends TableInstance<D>,
    UsePaginationInstanceProps<D> {
  state: ITableState<D>;
}

export interface ITableOptions<D extends object>
  extends TableOptions<D>,
    UsePaginationOptions<D> {}
