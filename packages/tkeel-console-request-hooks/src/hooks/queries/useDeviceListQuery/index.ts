import { useQuery } from '@tkeel/console-hooks';

const url = '/tkeel-device/v1/search';
const method = 'POST';

export interface DeviceItem {
  id: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
      directConnection: boolean;
      templateId: string;
      templateName: string;
      selfLearn: boolean;
      parentId: string;
      parentName: string;
      ext: {
        [propName: string]: unknown;
      };
    };
    sysField: {
      _status: boolean | string;
      _createdAt: number;
      _subscribeAddr: string;
      [propName: string]: unknown;
    };
    connectInfo?: {
      _online: boolean;
      _clientId?: string;
      _peerHost?: string;
      _protocol?: string;
      _sockPort?: string;
      _userName?: string;
    };
  };
}

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items?: DeviceItem[];
    total: number;
  };
}

type RequestDataCondition = {
  field: string;
  operator: string;
  value: unknown;
};

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
  enabled?: boolean;
};

const defaultRequestData = {
  page_num: 1,
  page_size: 10_000,
  order_by: 'name',
  is_descending: false,
  query: '',
};

export default function useDeviceListQuery(props?: Props) {
  const requestData: RequestData | undefined = props?.requestData;
  const enabled = props?.enabled ?? true;
  let requestConditions = requestData?.condition || [];
  requestConditions = requestConditions.filter(
    (condition) => !(condition.field === 'type' && condition.value === 'device')
  );
  const newRequestData = {
    ...defaultRequestData,
    ...requestData,
    condition: [
      {
        field: 'type',
        operator: '$eq',
        value: 'device',
      },
      ...requestConditions,
    ],
  };

  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: newRequestData,
    reactQueryOptions: { enabled },
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
