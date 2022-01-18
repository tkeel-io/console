import { Table } from '@tkeel/console-components';

import { ITenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

export interface IProps {
  data: ITenant[];
  columns: Array<any>;
}

export default function TenantSpaceTable({ data, columns }: IProps) {
  return <Table data={data} columns={columns} scroll={{ y: 'scroll' }} />;
}
