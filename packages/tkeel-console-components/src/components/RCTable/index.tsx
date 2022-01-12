import React from 'react';
import RcTable from 'rc-table';
import { TableProps as RcTableProps } from 'rc-table/lib/Table';

import './index.scss';

function Table<RecordType>({
  columns,
  data,
  scroll,
}: RcTableProps<RecordType>) {
  return <RcTable columns={columns} data={data} scroll={scroll} />;
}

export default Table;
