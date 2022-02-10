import { useRef } from 'react';
import { Flex, Select, Text } from '@chakra-ui/react';
import {
  ChevronLeftFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';
import { UsePaginationReturnType } from '@tkeel/console-types';
import RCPagination from 'rc-pagination';

import './index.scss';

function Pagination({
  pageNum,
  pageSize,
  totalSize,
  canPreviousPage,
  canNextPage,
  setPageNum,
  setPageSize,
}: UsePaginationReturnType) {
  const pageSizeRef = useRef(pageSize);

  const pageSizeArr: number[] = [];

  Array.from({ length: 5 }).forEach((_, i) => {
    pageSizeArr.push(pageSizeRef.current * (i + 1));
  });

  return (
    <Flex
      paddingLeft="20px"
      paddingRight="10px"
      justifyContent="space-between"
      alignItems="center"
      flexShrink="0"
      height="56px"
      backgroundColor="gray.50"
    >
      <Flex alignItems="center" height="32px" fontSize="12px">
        共
        <Text margin="0 3px" color="primary">
          {totalSize}
        </Text>
        项数据
      </Flex>
      <Flex alignItems="center">
        <Select
          marginRight="16px"
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
        <RCPagination
          current={pageNum}
          pageSize={pageSize}
          total={totalSize}
          prevIcon={
            <ChevronLeftFilledIcon
              color={canPreviousPage ? 'gray.700' : 'gray.500'}
              style={{ cursor: canPreviousPage ? 'pointer' : 'not-allowed' }}
            />
          }
          nextIcon={
            <ChevronRightFilledIcon
              color={canNextPage ? 'gray.700' : 'gray.500'}
              style={{
                cursor: canNextPage ? 'pointer' : 'not-allowed',
              }}
            />
          }
          jumpPrevIcon="..."
          jumpNextIcon="..."
          onChange={setPageNum}
        />
      </Flex>
    </Flex>
  );
}

export default Pagination;
