/* eslint-disable react/jsx-key */
import React, { ReactElement } from 'react';
import { useTable } from 'react-table';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface Props {
  data: Array<any>;
  columns: Array<any>;
}

function TenantSpaceTable({ data, columns }: Props): ReactElement {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <Table {...getTableProps()} size="sm">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()} color="gray.600">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default TenantSpaceTable;

// {
//         // Make an expander cell
//         Header: () => null, // No header
//         id: 'expander', // It needs an ID
//         Cell: ({ row }) => (
//           // Use Cell to render an expander for each row.
//           // We can use the getToggleRowExpandedProps prop-getter
//           // to build the expander.
//           <span {...row.getToggleRowExpandedProps()}>
//             {row.isExpanded ? '👇' : '👉'}
//           </span>
//         ),
//       },
