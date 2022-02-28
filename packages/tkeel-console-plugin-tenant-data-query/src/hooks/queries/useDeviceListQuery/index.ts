import useQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/useQuery';
import RequestData from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

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

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items?: DeviceItem[];
  };
}

export default function useDeviceListQuery({
  requestData,
  enabled,
}: {
  requestData: RequestData;
  enabled: boolean;
}) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: requestData,
    reactQueryOptions: { enabled },
  });
  const deviceList = data?.listDeviceObject?.items ?? [];
  return { deviceList, data, ...rest };
}
