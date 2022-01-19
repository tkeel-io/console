import { Table } from '@tkeel/console-components';

import { Tenant } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

export interface Props {
  data: Tenant[];
  columns: any[];
}

export default function TenantSpaceTable({ data, columns }: Props) {
  return <Table data={data} columns={columns} scroll={{ y: 'scroll' }} />;
}
