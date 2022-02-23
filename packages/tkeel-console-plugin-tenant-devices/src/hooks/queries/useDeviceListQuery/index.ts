import { RequestResult } from '@tkeel/console-utils';

import useQuery from '@/tkeel-console-plugin-tenant-devices/hooks/useQuery';

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
      directConnection: boolean;
      templateId?: string;
      selfLearn: boolean;
      [propName: string]: any;
    };
    sysField: {
      _status: boolean | string;
      _createdAt: number;
      _subscribeAddr: string;
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
}): { deviceList: DeviceApiItem[]; [propName: string]: unknown } {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
    reactQueryOptions: { onSuccess },
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
