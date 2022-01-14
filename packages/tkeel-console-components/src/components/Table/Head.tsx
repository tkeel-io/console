/* eslint-disable react/jsx-key */
import { Box, Th, Thead, Tr } from '@chakra-ui/react';

import { IHeaderGroup, ITableHeaderProps, OnSortProps } from './types';

type Props<D extends object> = {
  headerGroups: IHeaderGroup<D>[];
  onSort: ({ id, isSorted, isSortedDesc }: OnSortProps<D>) => void | undefined;
};

function Head<D extends object>({ headerGroups, onSort }: Props<D>) {
  const handleClick = (column: IHeaderGroup<D>) => {
    const { id, isSorted, isSortedDesc } = column;
    onSort({ id, isSorted, isSortedDesc: Boolean(isSortedDesc) });
  };

  return (
    <Thead>
      {headerGroups.map((headerGroup) => {
        return (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: IHeaderGroup<D>) => {
              const headerProps = column.getHeaderProps(
                column.getSortByToggleProps()
              ) as ITableHeaderProps;

              return (
                <Th
                  display="flex"
                  position="sticky"
                  color="gray.400"
                  {...headerProps}
                  onClick={(e) => {
                    if (headerProps.onClick) {
                      headerProps.onClick(e);
                      handleClick(column);
                    }
                  }}
                >
                  {column.render('Header')}
                  <Box>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </Box>
                </Th>
              );
            })}
          </Tr>
        );
      })}
    </Thead>
  );
}

export default Head;
