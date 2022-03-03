import { usePortalQuery } from '@tkeel/console-hooks';
import { isEnvDevelopment, RequestResult } from '@tkeel/console-utils';

const url = '/rudder/v1/entries';
const method = 'GET';

export interface Menu {
  id: string;
  name: string;
  icon?: string;
  path?: string;
  entry?: string | { scripts?: string[]; styles?: string[]; html?: string };
  children?: Menu[];
}

export interface ApiData {
  '@type': string;
  entries: Menu[];
}

type Props = {
  onSuccess: (
    data: RequestResult<ApiData, undefined, undefined>
  ) => void | undefined;
};

const defaultProps = {
  onSuccess: undefined,
};

export default function useMenusQuery(props?: Props) {
  const { onSuccess } = { ...defaultProps, ...props };
  const { data, ...rest } = usePortalQuery<ApiData>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
  const menus = data?.entries || [];

  if (isEnvDevelopment()) {
    let mockMenus: Menu[] = [];

    try {
      mockMenus = (PORTAL_GLOBALS?.mock?.menus ?? []) as Menu[];
    } catch {
      //
    }

    return {
      menus: [...menus, ...mockMenus],
      data,
      ...rest,
    };
  }

  return { menus, data, ...rest };
}
