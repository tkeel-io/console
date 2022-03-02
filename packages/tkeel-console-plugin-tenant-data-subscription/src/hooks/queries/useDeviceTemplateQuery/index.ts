import { usePluginQuery } from '@tkeel/console-hooks';

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

export default function useDeviceTemplateQuery(requestParams: RequestParams) {
  const { data, ...rest } = usePluginQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: requestParams,
  });
  const items = data?.listDeviceObject?.items ?? {};
  return { items, data, ...rest };
}
