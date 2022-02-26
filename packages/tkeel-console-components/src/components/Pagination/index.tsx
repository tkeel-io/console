import './index.scss';

import { Flex, Select, StyleProps, Text } from '@chakra-ui/react';
import RCPagination from 'rc-pagination';

import {
  ChevronLeftFilledIcon,
  ChevronRightFilledIcon,
} from '@tkeel/console-icons';

type Props = {
  pageNum?: number;
  pageSize?: number;
  pageSizeArr?: number[];
  totalSize?: number;
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  setPageNum?: (pageNum: number) => unknown;
  setPageSize?: (pageSize: number) => unknown;
  showBoxShadow?: boolean;
  style?: StyleProps;
};

function Pagination({
  pageNum = 1,
  pageSize = 20,
  pageSizeArr = [20, 40, 80, 100, 120],
  totalSize = 0,
  canPreviousPage = false,
  canNextPage = false,
  setPageNum,
  setPageSize,
  showBoxShadow = false,
  style = {},
}: Props) {
  return (
    <Flex
      padding="0 20px"
      justifyContent="space-between"
      alignItems="center"
      flexShrink="0"
      height="56px"
      boxShadow={
        showBoxShadow ? '0px -4px 8px rgba(239, 244, 249, 0.8)' : 'none'
      }
      {...style}
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
            if (setPageSize) {
              setPageSize(Number(e.target.value));
            }
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
          onChange={(value) => {
            if (setPageNum) {
              setPageNum(value);
            }
          }}
        />
      </Flex>
    </Flex>
  );
}

export default Pagination;
