import useQuery from '../useQuery';

const url = '/security/v1/tenants';
const method = 'GET';

export interface Tenant {
  id: number;
  remark: string;
  title: string;
  [propName: string]: unknown;
}
export default function useTenantsQuery() {
  const { data, ...rest } = useQuery<Tenant[]>({ url, method });
  const tenantList = data || [];
  return { tenantList, ...rest };
}
