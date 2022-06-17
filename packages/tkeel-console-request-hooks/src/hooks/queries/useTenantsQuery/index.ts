import { useQuery } from '@tkeel/console-hooks';
import { AuthType } from '@tkeel/console-types';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

interface TenantAdmin {
  username: '';
  password: '';
}

interface Tenant {
  tenant_id: string;
  title: string;
  auth_type: AuthType;
  admins: TenantAdmin[];
  remark: string;

  num_user: number;
  created_at: string;
  roles: string[];
}

interface AipData {
  '@type': string;
  page_num: number;
  page_size: number;
  total: number;
  tenants: Tenant[];
}

export type { Tenant, TenantAdmin };

export default function useTenantsQuery(options?: { params?: RequestParams }) {
  const params = options?.params;
  const { data, ...rest } = useQuery<AipData, RequestParams>({
    url: '/security/v1/tenants',
    method: 'GET',
    params,
  });
  const tenants = data?.tenants ?? [];
  const total = data?.total ?? 0;
  return { total, tenants, data, ...rest };
}
