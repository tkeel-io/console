import useMutation from '@/tkeel-console-plugin-admin-tenants/hooks/useMutation';

const url = '/security/v1/tenants';
const method = 'POST';

interface RequestData {
  title: string;
  admin: { username: string; password?: string; nick_name?: string };
  remark?: string;
}

export interface ApiData {
  admin: { username: string; password: string };
  remark: string;
  tenant_id: number;
  title: string;
}

export default function useCreateTenantMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return useMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
