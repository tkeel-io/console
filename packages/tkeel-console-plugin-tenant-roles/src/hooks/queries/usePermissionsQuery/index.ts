import useQuery from '@/tkeel-console-plugin-tenant-roles/hooks/useQuery';

const method = 'GET';

type RequestParams = {
  key_words?: string;
};

type Args = {
  params?: RequestParams;
};

interface Permission {
  id: string;
  name: string;
  desc: string;
  dependences: { path: string; desc: string }[];
  children?: Permission[];
}

interface PermissionData {
  path: string;
  permission: Permission;
}

export interface ApiData {
  '@type': string;
  permissions: PermissionData[];
}

export default function usePermissionsQuery({ params }: Args = {}) {
  const url = '/security/v1/rbac/permissions';

  const { data, ...rest } = useQuery<ApiData, RequestParams>({
    url,
    method,
    params,
  });
  const permissions = data?.permissions ?? [];

  return { permissions, data, ...rest };
}
