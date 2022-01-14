/* eslint-disable react/jsx-key */
import { Box, Th, Thead, Tr } from '@chakra-ui/react';

import { IHeaderGroup, ITableHeaderProps } from './types';

type Props<D extends object> = {
  headerGroups: IHeaderGroup<D>[];
};

function Head<D extends object>({ headerGroups }: Props<D>) {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => {
        return (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: IHeaderGroup<D>) => {
              const headerProps = column.getHeaderProps(
                column.getSortByToggleProps ? column.getSortByToggleProps() : {}
              ) as ITableHeaderProps;

              return (
                <Th
                  display="flex"
                  position="sticky"
                  color="gray.400"
                  {...headerProps}
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
