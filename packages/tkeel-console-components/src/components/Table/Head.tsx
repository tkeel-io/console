/* eslint-disable react/jsx-key */
import { Box, StyleProps, Th, Thead, Tr } from '@chakra-ui/react';
import { HeaderGroup } from 'react-table';

type Props<D extends object> = {
  headerGroups: HeaderGroup<D>[];
  fixHead: boolean;
  canSort: boolean;
  isShowStripe: boolean;
  styles?: {
    head?: StyleProps;
    tr?: StyleProps;
  };
};

function Head<D extends object>({
  headerGroups,
  fixHead,
  canSort,
  isShowStripe,
  styles,
}: Props<D>) {
  return (
    <Thead
      backgroundColor={isShowStripe ? 'gray.100' : 'transparent'}
      {...styles?.head}
    >
      {headerGroups.map((headerGroup) => {
        return (
          <Tr
            {...headerGroup.getHeaderGroupProps()}
            borderBottom="1px"
            borderColor={isShowStripe ? 'transparent' : 'grayAlternatives.50'}
            {...styles?.tr}
          >
            {headerGroup.headers.map((column: HeaderGroup<D>) => {
              const headerProps = column.getHeaderProps(
                canSort ? column.getSortByToggleProps() : {}
              );

              return (
                <Th
                  display="flex"
                  alignItems="center"
                  height="34px"
                  padding="0 20px"
                  position={fixHead ? 'sticky' : 'static'}
                  color="grayAlternatives.400"
                  border="none"
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
