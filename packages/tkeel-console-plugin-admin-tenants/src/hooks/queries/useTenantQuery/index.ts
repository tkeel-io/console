import { useQuery } from '@tkeel/console-hooks';

import { AuthTypes } from '@/tkeel-console-plugin-admin-tenants/hooks/queries/useTenantsQuery';

const method = 'GET';

interface AipData {
  '@type': string;
  tenant_id: string;
  title: string;
  auth_type: AuthTypes;
  num_user: number;
  admins: { username: string; password: string }[];
  remark: string;
  created_at: string;
}

export default function useTenantQuery({ tenantId }: { tenantId: string }) {
  const url = `/security/v1/tenants/${tenantId}`;
  return useQuery<AipData>({ url, method });
}
