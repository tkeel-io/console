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
  status: boolean;
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
      _status: boolean;
      _createdAt: number;
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
}: {
  params?: RequestParams;
}): { deviceList: DeviceApiItem[]; [propName: string]: unknown } {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
