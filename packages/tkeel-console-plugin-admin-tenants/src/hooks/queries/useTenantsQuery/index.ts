import useQuery from '@/tkeel-console-plugin-admin-tenants/hooks/useQuery';

const url = '/security/v1/tenants';
const method = 'GET';

export interface Tenant {
  tenant_id: string;
  title: string;
  remark: string;

  num_user: number;
  created_at: string;
  roles: string[];
}

interface AipData {
  '@type': string;
  tenants: Tenant[];
}

export default function useTenantsQuery() {
  const { data, ...rest } = useQuery<AipData>({ url, method });
  const tenants = data?.tenants ?? [];
  return { tenants, data, ...rest };
}
