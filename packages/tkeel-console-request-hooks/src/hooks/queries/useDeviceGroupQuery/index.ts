import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/groups/tree';
const method = 'POST';

export interface TreeNodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
      parentId: string;
      parentName?: string;
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
    nodeInfo: TreeNodeInfo;
    subNode: TreeNodeType;
  };
}

interface ApiData {
  '@type': string;
  GroupTree: TreeNodeType;
}

export interface RequestDataCondition {
  field: string;
  operator: string;
  value: unknown;
}

type RequestData = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: RequestDataCondition[];
};

type Props = {
  requestData: RequestData;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
};

const defaultRequestData = {
  page_num: 1,
  page_size: 10_000,
  order_by: 'name',
  is_descending: false,
  query: '',
};

export default function useDeviceGroupQuery(props?: Props) {
  const requestData: RequestData | undefined = props?.requestData;
  const onSuccess = props?.onSuccess;
  let requestConditions = requestData?.condition || [];
  requestConditions = requestConditions.filter(
    (condition) => !(condition.field === 'type' && condition.value === 'group')
  );
  const newRequestData = {
    ...defaultRequestData,
    ...requestData,
    condition: [
      {
        field: 'type',
        operator: '$eq',
        value: 'group',
      },
      ...requestConditions,
    ],
  };

  const reactQueryOptions = onSuccess ? { onSuccess } : {};
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: newRequestData,
    reactQueryOptions,
  });

  const deviceGroupTree = data?.GroupTree ?? {};
  return { deviceGroupTree, data, ...rest };
}
