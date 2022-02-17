import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface NodeInfo {
  id: string;
  type: string;
  properties: {
    group: {
      name: string;
      [propName: string]: unknown;
    };
    sysField: {
      [propName: string]: unknown;
    };
  };
  [propName: string]: unknown;
}
export interface TreeNodeType {
  [propName: string]: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}
type RequestParams = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: any[];
};
interface ApiData {
  '@type': string;
  GroupTree: TreeNodeType;
}
const defaultRequestParams = {
  page_num: 1,
  page_size: 9_999_999_999_999,
  order_by: 'name',
  is_descending: false,
  query: '',
  condition: [
    {
      field: 'type',
      operator: '$eq',
      value: 'group',
    },
  ],
};

export default function useGroupTreeQuery() {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: defaultRequestParams,
  });
  const groupTree = data?.GroupTree ?? {};
  return { groupTree, data, ...rest };
}
