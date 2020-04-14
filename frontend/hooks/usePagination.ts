import { useState } from 'react';
import { PaginationConfig } from 'antd/lib/pagination';
import { SorterResult } from 'antd/lib/table/interface';
import { SortDirection } from '@/generated/types';

const defaultPagination = {
  offset: 0,
  limit: 10,
  sortBy: null,
  sortDir: SortDirection.DESC
};

const createHandleTableChange = setPagination => (
  pagination: PaginationConfig,
  _,
  sorter: SorterResult<any>
) => {
  const { current, pageSize } = pagination;
  const { order, columnKey } = sorter || {};

  setPagination({
    offset: (current - 1) * pageSize || 0,
    limit: pageSize,

    sortBy: columnKey,
    sortDir: order === 'ascend' ? SortDirection.ASC : SortDirection.DESC
  });
};

interface PaginationOptions<T> {
  defaultSortBy?: T;
  defaultSortDir?: SortDirection;
}
export default function usePagination<T = any>({
  defaultSortBy,
  defaultSortDir
}: PaginationOptions<T>) {
  const [pagination, setPagination] = useState({
    ...defaultPagination,
    sortBy: defaultSortBy,
    sortDir: defaultSortDir || defaultPagination.sortDir
  });

  const handleTableChange = createHandleTableChange(setPagination);
  return { pagination, handleTableChange };
}
