import { useRef } from 'react';
import { Flex, Select, Text } from '@chakra-ui/react';
import {
  ChevronLeftFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';

type Props = {
  pageIndex: number;
  pageSize: number;
  totalSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
};

function Pagination({
  pageIndex,
  pageSize,
  totalSize,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  setPageSize,
}: Props) {
  const pageSizeRef = useRef(pageSize);

  const startIndex = pageIndex * pageSize + 1;
  const endIndex = canNextPage ? startIndex + pageSize - 1 : totalSize;

  const pageSizeArr: number[] = [];

  Array.from({ length: 5 }).forEach((_, i) => {
    pageSizeArr.push(pageSizeRef.current * (i + 1));
  });

  return (
    <Flex
      padding="0 24px"
      justifyContent="space-between"
      alignItems="center"
      flexShrink="0"
      height="56px"
      backgroundColor="gray.50"
    >
      <Flex alignItems="center" height="32px">
        <Text color="gray.800" fontSize="14px" fontWeight="600">
          每页显示
        </Text>
        <Select
          marginLeft="5px"
          width="75px"
          borderColor="gray.200"
          _focus={{ boxShadow: 'none' }}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          size="sm"
        >
          {pageSizeArr.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex alignItems="center">
        <Flex marginRight="30px" alignItems="center">
          <Text fontSize="14px" color="gray.800">
            {startIndex}-{endIndex}
          </Text>
          <Text marginLeft="3px" fontSize="14px" color="gray.500">
            of {totalSize}
          </Text>
        </Flex>
        <ChevronLeftFilledIcon
          color={canPreviousPage ? 'gray.700' : 'gray.500'}
          style={{ cursor: canPreviousPage ? 'pointer' : 'not-allowed' }}
          onClick={previousPage}
        />
        <ChevronRightFilledIcon
          color={canNextPage ? 'gray.700' : 'gray.500'}
          style={{
            marginLeft: '30px',
            cursor: canNextPage ? 'pointer' : 'not-allowed',
          }}
          onClick={nextPage}
        />
      </Flex>
    </Flex>
  );
}

export default Pagination;
