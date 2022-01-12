/* eslint-disable react/jsx-key */
import { usePagination, useTable } from 'react-table';
import {
  Box,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import Pagination from '@/tkeel-console-components/components/Pagination';

import { ITableInstance, ITableOptions, Props } from './types';

function Table<D extends Record<string, unknown>>({ columns, data }: Props<D>) {
  const defaultPageSize = 10;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<D>(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize },
    } as ITableOptions<D>,
    usePagination
  ) as ITableInstance<D>;

  return (
    <Box>
      <ChakraTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th color="gray.400" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td
                      paddingTop="12px"
                      paddingBottom="12px"
                      color="gray.500"
                      fontSize="14px"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalSize={data.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
      />
    </Box>
  );
}

export default Table;
