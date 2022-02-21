import useQuery from '@/tkeel-console-plugin-admin-tenants/hooks/useQuery';

const url = '/security/v1/tenants';
const method = 'GET';

type RequestParams = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  key_words?: string;
};

export interface Admin {
  username: '';
  password: '';
}

export interface Tenant {
  tenant_id: string;
  title: string;
  admins: Admin[];
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

export default function useTenantsQuery({
  params,
}: {
  params?: RequestParams;
}) {
  const { data, ...rest } = useQuery<AipData, RequestParams>({
    url,
    method,
    params,
  });
  const tenants = data?.tenants ?? [];
  const total = data?.total ?? 0;
  return { total, tenants, data, ...rest };
}
