import { StyleProps, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

type Props<D extends object> = {
  page: Row<D>[];
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<D> | undefined
  ) => TableBodyProps;
  prepareRow: (row: Row<D>) => void;
  scroll:
    | {
        y: string;
      }
    | undefined;
  isShowStripe: boolean;
  expandRow?: (data: D) => ReactNode;
  styles?: {
    body?: StyleProps;
    tr?: StyleProps;
    td?: StyleProps;
  };
};

type BodyStyle = {
  height: string;
  overflowY: string;
};

function Body<D extends object>({
  page,
  getTableBodyProps,
  prepareRow,
  scroll,
  isShowStripe,
  expandRow,
  styles,
}: Props<D>) {
  const bodyStyle = {};
  if (scroll && scroll.y) {
    (bodyStyle as BodyStyle).height = scroll.y;
    (bodyStyle as BodyStyle).overflowY = 'overlay';
  }

  return (
    <Tbody {...bodyStyle} {...getTableBodyProps()} {...styles?.body}>
      {page.map((row, i) => {
        prepareRow(row);
        let backgroundColor = 'transparent';
        const defaultBorderColor = 'grayAlternatives.50';
        let borderColor = isShowStripe ? 'transparent' : defaultBorderColor;
        if (isShowStripe) {
          if (i % 2 === 1) {
            backgroundColor = 'gray.50';
          } else if (i === page.length - 1) {
            borderColor = defaultBorderColor;
          }
        }

        const { id, getRowProps, cells, isExpanded, original } = row;

        return (
          <Fragment key={id}>
            <Tr
              backgroundColor={backgroundColor}
              _hover={
                isShowStripe ? {} : { backgroundColor: 'grayAlternatives.50' }
              }
              borderBottom="1px"
              borderColor={borderColor}
              {...getRowProps()}
              {...styles?.tr}
            >
              {cells.map((cell) => {
                const columnCell = cell.column.Cell as { name: string };
                const funcName = columnCell.name;
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Td
                    display="flex"
                    alignItems="center"
                    height="40px"
                    padding="0 20px"
                    color="gray.700"
                    fontSize="12px"
                    border="none"
                    {...cell.getCellProps()}
                    {...styles?.td}
                  >
                    {funcName === 'defaultRenderer' ? (
                      <Text title={String(cell.value)} isTruncated>
                        {cell.value}
                      </Text>
                    ) : (
                      cell.render('Cell')
                    )}
                  </Td>
                );
              })}
            </Tr>
            {!!expandRow && isExpanded && (
              <Tr display="flex">
                <Td flex="1" padding="0" border="none">
                  {expandRow(original)}
                </Td>
              </Tr>
            )}
          </Fragment>
        );
      })}
    </Tbody>
  );
}

export default Body;
