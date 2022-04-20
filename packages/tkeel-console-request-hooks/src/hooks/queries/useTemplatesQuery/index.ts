import { useQuery, UseQueryOptionsExtended } from '@tkeel/console-hooks';
import { AttributeItem } from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

const url = '/tkeel-device/v1/search';
const method = 'POST';

export interface TemplateItem {
  configs: {
    attributes: { [propName: string]: AttributeItem };
  };
  id: string;
  properties: {
    basicInfo: {
      name: string;
      description: string;
    };
    sysField: {
      _createdAt: string | number;
      _updatedAt: string | number;
    };
  };
}

type RequestDataCondition = {
  field: string;
  operator: string;
  value: unknown;
};

type RequestData = {
  page_num?: number;
  page_size?: number;
  order_by?: string;
  is_descending?: boolean;
  query?: string;
  condition?: RequestDataCondition[];
};

interface ApiData {
  '@type': string;
  listDeviceObject: {
    items: TemplateItem[];
    total: number;
  };
}

export interface KeyDataType {
  title: string;
  description: string;
  id: string;
  key?: string;
  updatedAt: string;
}

type Props = {
  requestData?: RequestData;
  enabled?: boolean;
  onSuccess?: (data: RequestResult<ApiData, undefined, RequestData>) => void;
};

const defaultRequestData = {
  page_num: 1,
  page_size: 10_000,
  order_by: 'name',
  is_descending: false,
  query: '',
};

export default function useTemplatesQuery(props?: Props) {
  const requestData: RequestData | undefined = props?.requestData;
  const onSuccess = props?.onSuccess;
  const enabled = props?.enabled ?? true;
  let requestConditions = requestData?.condition || [];
  requestConditions = requestConditions.filter(
    (condition) =>
      !(condition.field === 'type' && condition.value === 'template')
  );
  const newRequestData = {
    ...defaultRequestData,
    ...requestData,
    condition: [
      {
        field: 'type',
        operator: '$eq',
        value: 'template',
      },
      ...requestConditions,
    ],
  };

  const reactQueryOptions: UseQueryOptionsExtended<
    ApiData,
    undefined,
    RequestData
  > = { enabled };
  if (onSuccess) {
    reactQueryOptions.onSuccess = onSuccess;
  }
  const { data, ...rest } = useQuery<ApiData, undefined, RequestData>({
    url,
    method,
    data: newRequestData,
    reactQueryOptions,
  });
  const templates = data?.listDeviceObject?.items ?? [];
  const total = data?.listDeviceObject?.total ?? 0;
  return { templates, total, data, ...rest };
}
