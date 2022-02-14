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

const usePagination = (props?: Props): UsePaginationReturnType => {
  const { pageNum, pageSize, totalSize } = { ...defaultProps, ...props };

  const [total, setTotal] = useState(totalSize);
  const [size, setSize] = useState(pageSize);
  const [page, setPage] = useState(pageNum);
  const initTotalPages = Math.ceil(total / size);

  const [totalPages, setTotalPages] = useState(initTotalPages);
  const canNextPage = size * page < total;

  const setPageIndexSAFE = (pageIndexValue: number) => {
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
      setPage(totalPages || 1);
    }
  }, [page, totalPages]);

  return {
    pageNum: page,
    pageSize: size,
    totalSize: total,
    canPreviousPage: page > 1,
    canNextPage,
    setPageNum: setPageIndexSAFE,
    setPageSize,
    setTotalSize,
  };
};

export default usePagination;
