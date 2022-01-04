import useQuery from '@/tkeel-console-core/hooks/useQuery';

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

export default function useMenusQuery() {
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
  });
  const menus = data?.entries || [];

  if (process.env.NODE_ENV === 'development') {
    let mockMenus: Menu[] = [];

    try {
      mockMenus = JSON.parse(process.env.MOCK_MENUS || '') as Menu[];
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
