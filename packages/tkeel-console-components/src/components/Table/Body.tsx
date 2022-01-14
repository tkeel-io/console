/* eslint-disable react/jsx-key */
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';
import { Tbody, Td, Tr } from '@chakra-ui/react';

type Props<D extends object> = {
  page: Row<D>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<D> | undefined
  ) => TableBodyProps;
  prepareRow: (row: Row<D>) => void;
};

function Body<D extends object>({
  page,
  getTableBodyProps,
  prepareRow,
}: Props<D>) {
  return (
    <Tbody height="100%" overflowY="auto" {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <Tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <Td
                  height="40px"
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
  );
}

export default Body;
