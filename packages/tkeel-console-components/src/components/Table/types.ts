import { StyleProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IdType, SortingRule, UseTableOptions } from 'react-table';

import { UsePaginationReturnType } from '@tkeel/console-types';

type OnSelectProps<D extends object> = {
  isAllRowsSelected: boolean;
  selectedRowIds: Record<IdType<D>, boolean>;
  // selectedFlatRows: Row<D>[];
  selectedFlatRows: D[];
};

export interface Props<D extends object> extends UseTableOptions<D> {
  // defaultPageSize?: number;
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
    table?: StyleProps;
    head?: StyleProps;
    headTr?: StyleProps;
    body?: StyleProps;
    bodyTr?: StyleProps;
    pagination?: StyleProps;
  };
  onSelect?: ({
    isAllRowsSelected,
    selectedRowIds,
    selectedFlatRows,
  }: OnSelectProps<D>) => void;
  onSort?: (sortBy: Array<SortingRule<D>>) => void;
}
