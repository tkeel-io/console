import { useQuery } from '@tkeel/console-hooks';
import { env, RequestResult } from '@tkeel/console-utils';

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

export function getMockMenus() {
  let mockMenus: Menu[] = [];

  const localMockMenus = sessionStorage.getItem('mockMenus');
  const { showDevTools } = GLOBAL_PORTAL_CONFIG?.client || {};
  try {
    if (showDevTools && localMockMenus) {
      mockMenus = JSON.parse(localMockMenus) as Menu[];
    } else {
      mockMenus = (GLOBAL_PORTAL_CONFIG?.mock?.menus ?? []) as Menu[];
      if (showDevTools) {
        sessionStorage.setItem('mockMenus', JSON.stringify(mockMenus, null, 2));
      }
    }
  } catch {
    //
  }

  return mockMenus;
}

export default function useMenusQuery(props?: Props) {
  const { onSuccess } = { ...defaultProps, ...props };
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
    reactQueryOptions: {
      onSuccess,
    },
  });
  const menus = data?.entries || [];

  if (env.isEnvDevelopment()) {
    return {
      menus: [...getMockMenus()],
      data,
      ...rest,
    };
  }

  return { menus, data, ...rest };
}
