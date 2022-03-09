import { useQuery } from '@tkeel/console-hooks';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: any };
      parentId: string;
      parentName?: string;
      [propName: string]: any;
    };
    sysField: {
      [propName: string]: any;
    };
  };
  [propName: string]: any;
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
  page_size: 1000,
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
