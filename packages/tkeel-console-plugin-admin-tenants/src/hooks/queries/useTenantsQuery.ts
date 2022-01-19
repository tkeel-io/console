import useQuery from '../useQuery';

const url = '/security/v1/tenants';
const method = 'GET';

export interface ITenant {
  id: number;
  remark: string;
  title: string;
  [propName: string]: any;
}
export default function useTenantsQuery() {
  const { data, ...rest } = useQuery<ITenant[]>({ url, method });
  const tenantList = data || [];
  return { tenantList, ...rest };
}
