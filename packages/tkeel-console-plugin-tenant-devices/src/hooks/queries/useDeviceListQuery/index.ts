import { usePluginQuery } from '@tkeel/console-hooks';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/search';
const method = 'POST';

type RequestParams = {
  page_name?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition: any[];
};

export interface DeviceItem {
  id: string;
  name: string;
  directConnection: boolean;
  templateId?: string;
  createTime: number;
  status: boolean | string;
  selfLearn?: boolean;
  [propName: string]: unknown;
}

export interface DeviceApiItem {
  id: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
      directConnection: boolean;
      templateId?: string;
      selfLearn: boolean;
      parentId: string;
      parentName?: string;
      ext: {
        [propName: string]: any;
      };
      [propName: string]: any;
    };
    sysField: {
      _status: boolean | string;
      _createdAt: number;
      _subscribeAddr: string;
      [propName: string]: any;
    };
    connectInfo?: {
      _online: boolean;
      _clientId?: string;
      _peerHost?: string;
      _protocol?: string;
      _sockPort?: string;
      _userName?: string;
      [propName: string]: any;
    };
  };
  [propName: string]: any;
}

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items?: DeviceApiItem[];
    [propName: string]: any;
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
  const { data, ...rest } = usePluginQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
    reactQueryOptions: { onSuccess },
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
