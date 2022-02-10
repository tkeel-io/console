import { useEffect, useState } from 'react';
import { UsePaginationReturnType } from '@tkeel/console-types';

type Props = {
  pageNum?: number;
  pageSize?: number;
  totalSize?: number;
};

const usePagination = ({
  pageNum = 1,
  pageSize = 20,
  totalSize = 0,
}: Props): UsePaginationReturnType => {
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
    setSize(pageSizeValue);
  };

  const setTotalSize = (totalValue: number) => {
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
