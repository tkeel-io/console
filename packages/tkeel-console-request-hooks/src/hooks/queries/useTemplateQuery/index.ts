/* eslint-disable no-underscore-dangle */
import { values } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { formatDateTimeByTimestamp } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/search';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    basicInfo: {
      description: string;
      name: string;
    };
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
    };
  };
}

export type TemplateTreeNodeDataType = {
  title: string;
  description: string;
  key: string;
  id: string;
  updatedAt: string | number;
};
export interface TemplateTreeNodeType {
  [propName: string]: {
    id: string;
    properties: {
      basicInfo: {
        name: string;
        description: string;
      };
      sysField: {
        _updatedAt: string | number;
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
  condition: { field: string; operator: string; value: string }[];
};
interface ApiData {
  '@type': string;
  listDeviceObject: TemplateTreeNodeType;
}

function getTemplateKeyData(
  data: TemplateTreeNodeType
): TemplateTreeNodeDataType[] {
  return values(data).map((item) => {
    return {
      title: item?.properties?.basicInfo?.name,
      description: item?.properties?.basicInfo?.description,
      id: item?.id,
      key: item?.id,
      updatedAt: formatDateTimeByTimestamp({
        timestamp: item?.properties?.sysField?._updatedAt,
      }),
    };
  });
}

export default function useTemplateQuery(requestParams: RequestParams) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: requestParams,
  });
  const items = data?.listDeviceObject?.items ?? {};

  const keyData = getTemplateKeyData(items);
  return { items, keyData, data, ...rest };
}
