import { usePluginQuery } from '@tkeel/console-hooks';

const method = 'GET';

interface AipData {
  '@type': string;
  tenant_id: string;
  title: string;
  num_user: number;
  admins: { username: string; password: string }[];
  remark: string;
  created_at: string;
}

export default function useTenantQuery({ tenantId }: { tenantId: string }) {
  const url = `/security/v1/tenants/${tenantId}`;
  return usePluginQuery<AipData>({ url, method });
}
