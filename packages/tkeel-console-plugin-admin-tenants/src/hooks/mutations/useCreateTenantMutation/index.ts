import { useMutation } from '@tkeel/console-hooks';

const url = '/security/v1/tenants';
const method = 'POST';

interface RequestData {
  title: string;
  admin: { username: string; password?: string; nick_name?: string };
  remark?: string;
}

export interface ApiData {
  '@type': string;
  tenant_id: string;
  tenant_title: string;
  admin_username: string;
  reset_key?: string;
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
