/* eslint-disable react/jsx-key */
import { Box, Th, Thead, Tr } from '@chakra-ui/react';

import { IHeaderGroup, ITableHeaderProps } from './types';

type Props<D extends object> = {
  headerGroups: IHeaderGroup<D>[];
  fixHead: boolean;
  canSort: boolean;
};

function Head<D extends object>({ headerGroups, fixHead, canSort }: Props<D>) {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => {
        return (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: IHeaderGroup<D>) => {
              const headerProps = column.getHeaderProps(
                canSort ? column.getSortByToggleProps() : {}
              ) as ITableHeaderProps;

              return (
                <Th
                  display="flex"
                  position={fixHead ? 'sticky' : 'static'}
                  color="gray.400"
                  {...headerProps}
                >
                  {column.render('Header')}
                  {canSort && (
                    <Box>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </Box>
                  )}
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
