import { usePluginMutation } from '@tkeel/console-hooks';

const method = 'PUT';

interface RequestData {
  title: string;
  remark?: string;
}

export interface ApiData {
  '@type': string;
  tenant_id: string;
  tenant_title: string;
  admin_username: string;
  reset_key?: string;
}

export default function useModifyTenantMutation({
  tenantId,
  onSuccess,
}: {
  tenantId: string;
  onSuccess: () => void;
}) {
  const url = `/security/v1/tenants/${tenantId}`;

  return usePluginMutation<ApiData, undefined, RequestData>({
    url,
    method,
    reactQueryOptions: { onSuccess },
  });
}
