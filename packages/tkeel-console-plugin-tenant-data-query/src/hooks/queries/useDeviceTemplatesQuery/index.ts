import useQuery from '@/tkeel-console-plugin-tenant-data-query/hooks/useQuery';
import RequestData from '@/tkeel-console-plugin-tenant-data-query/types/request-data';

const url = '/tkeel-device/v1/search';
const method = 'POST';

export interface NodeInfo {
  id: string;
  properties: {
    group: {
      name: string;
      description: string;
      ext: { [propName: string]: string };
    };
    sysField: {
      [propName: string]: unknown;
    };
  };
}

export type TemplateTreeNodeDataType = {
  title: string;
  key: string;
  id: string;
};

export interface Template {
  id: string;
  properties: {
    basicInfo: {
      name: string;
    };
  };
}

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items: Template[];
  };
}

type Props = {
  requestData: RequestData;
};

export default function useDeviceTemplatesQuery({ requestData }: Props) {
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: requestData,
  });
  const templates = data?.listDeviceObject?.items || [];
  return { templates, data, ...rest };
}
