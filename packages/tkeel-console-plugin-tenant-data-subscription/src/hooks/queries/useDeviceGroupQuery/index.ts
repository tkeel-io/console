import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
      [propName: string]: any;
    };
    sysField: {
      [propName: string]: any;
    };
  };
  [propName: string]: any;
}

export type TreeNodeData = {
  title: string;
  key: string;
  id: string;
  children: TreeNodeData[];
  icon?: any;
  path?: string;
  originData: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
};
export interface TreeNodeType {
  [propName: string]: {
    nodeInfo: NodeInfo;
    subNode: TreeNodeType;
  };
}
export type RequestParams = {
  page_num: number;
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

export default function useGroupTreeQuery(requestParams: RequestParams) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: requestParams,
  });
  const groupTree = data?.GroupTree ?? {};
  return { groupTree, data, ...rest };
}
