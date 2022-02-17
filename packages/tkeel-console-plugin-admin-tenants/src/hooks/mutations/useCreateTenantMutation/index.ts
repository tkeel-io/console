import useMutation from '@/tkeel-console-plugin-admin-tenants/hooks/useMutation';

const url = '/security/v1/tenants';
const method = 'POST';

export interface ApiData {
  admin: { username: string; password: string };
  remark: string;
  tenant_id: number;
  title: string;
}
interface RequestData {
  title: string;
  admin: { username: string; password?: string; nickName: string };
  remark?: string;
}

export default function useCreateTenantMutation() {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
  });
}
