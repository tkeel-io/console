import useQuery from '@/tkeel-console-plugin-tenant-data-subscription/hooks/useQuery';

const url = '/tkeel-device/v1/search';
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

export type TemplateTreeNodeDataType = {
  title: string;
  key: string;
  id: string;
};
export interface TemplateTreeNodeType {
  [propName: string]: {
    id: string;
    properties: {
      basicInfo: {
        name: string;
      };
    };
    nodeInfo: NodeInfo;
    subNode: TemplateTreeNodeType;
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
  listDeviceObject: TemplateTreeNodeType;
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
      value: 'template',
    },
  ],
};

export default function useDeviceTemplateQuery() {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: defaultRequestParams,
  });
  const items = data?.listDeviceObject?.items ?? {};
  return { items, data, ...rest };
}
