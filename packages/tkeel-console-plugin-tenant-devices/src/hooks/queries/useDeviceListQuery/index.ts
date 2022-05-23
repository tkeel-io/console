import { useQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/search';
const method = 'POST';

type RequestParams = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: { field: string; operator: string; value: string }[];
};

export interface DeviceApiItem {
  id: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
      directConnection: boolean;
      templateId?: string;
      templateName?: string;
      selfLearn: boolean;
      parentId: string;
      parentName?: string;
      ext: {
        [propName: string]: string;
      };
    };
    sysField: {
      _status: boolean | string;
      _createdAt: number;
      _subscribeAddr: string;
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

export interface DeviceItem {
  id: string;
  name: string;
  directConnection: boolean;
  templateId?: string;
  templateName: string;
  createTime: number;
  status: boolean | string;
  selfLearn?: boolean;
  originData?: DeviceApiItem;
}

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items?: DeviceApiItem[];
    total: number;
  };
}

export default function useDeviceListQuery({
  params,
  onSuccess,
}: {
  params?: RequestParams;
  onSuccess?: (
    data: RequestResult<ApiData, undefined, RequestParams>
  ) => unknown;
}) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
    reactQueryOptions: { onSuccess },
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
