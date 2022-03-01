import { useEffect, useState } from 'react';

import { UsePaginationReturnType } from '@tkeel/console-types';

type Props = {
  pageNum?: number;
  pageSize?: number;
  totalSize?: number;
};

const defaultProps = {
  pageNum: 1,
  pageSize: 20,
  totalSize: 0,
};

const getPageSizeArr = (pageSizeValue: number) => {
  return Array.from({ length: 5 }).map((_, i) => pageSizeValue * (i + 1));
};

export default function usePagination(props?: Props): UsePaginationReturnType {
  const { pageNum, pageSize, totalSize } = { ...defaultProps, ...props };
  // console.log('usePagination ~ pageNum', pageNum);

  const [total, setTotal] = useState(totalSize);
  const [size, setSize] = useState(pageSize);
  const [page, setPage] = useState(pageNum);
  // console.log('usePagination ~ page', page);
  const initTotalPages = Math.ceil(total / size);
  // console.log('usePagination ~ total', total);
  // console.log('usePagination ~ size', size);

  const [totalPages, setTotalPages] = useState(initTotalPages);
  const canNextPage = size * page < total;

  const setPageIndexSAFE = (pageIndexValue: number) => {
    // console.log('setPageIndexSAFE ~ pageIndexValue', pageIndexValue);
    // console.log('setPageIndexSAFE ~ totalPages', totalPages);
    if (pageIndexValue > totalPages) {
      setPage(totalPages);
    } else if (pageIndexValue < 1) {
      setPage(1);
    } else {
      setPage(pageIndexValue);
    }
  };

  const setPageSize = (pageSizeValue: number) => {
    if (pageSizeValue === size) return;
    setSize(pageSizeValue);
  };

  const setTotalSize = (totalValue: number) => {
    if (totalValue === total) return;
    setTotal(totalValue);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(total / size));
  }, [total, size]);

  useEffect(() => {
    if (page > totalPages) {
      // console.log('useEffect ~ page', page);
      // console.log('useEffect ~ totalPages', totalPages);
      // console.log('useEffect setPage', totalPages || 1);
      setPage(totalPages || 1);
    }
  }, [page, totalPages]);

  return {
    pageNum: page,
    pageSize: size,
    pageSizeArr: getPageSizeArr(size),
    totalSize: total,
    canPreviousPage: page > 1,
    canNextPage,
    setPageNum: setPageIndexSAFE,
    setPageSize,
    setTotalSize,
  };
}
