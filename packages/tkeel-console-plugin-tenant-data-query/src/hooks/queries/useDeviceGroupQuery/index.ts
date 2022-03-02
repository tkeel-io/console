import { usePluginQuery } from '@tkeel/console-hooks';

import RequestData from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
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

interface ApiData {
  '@type': string;
  GroupTree: TreeNodeType;
}

type Props = {
  requestData: RequestData;
};

export default function useDeviceGroupQuery({ requestData }: Props) {
  const { data, ...rest } = usePluginQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: requestData,
  });

  const deviceGroupTree = data?.GroupTree ?? {};
  return { deviceGroupTree, data, ...rest };
}
