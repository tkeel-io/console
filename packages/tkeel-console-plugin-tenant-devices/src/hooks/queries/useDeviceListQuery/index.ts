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
  name: string;
  directConnection: boolean;
  templateId: string;
  status?: object;
}

interface ApiData {
  '@type': string;
  listDeviceObject: object;
}

export default function useDeviceListQuery({
  params,
}: {
  params?: RequestParams;
}) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestParams>({
    url,
    method,
    data: params,
  });
  const listDeviceObject = data?.listDeviceObject ?? [];
  return { listDeviceObject, data, ...rest };
}
