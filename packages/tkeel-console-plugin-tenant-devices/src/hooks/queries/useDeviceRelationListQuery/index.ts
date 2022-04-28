import { useQuery } from '@tkeel/console-hooks';

import { ExpressionItem } from '@/tkeel-console-plugin-tenant-devices/pages/DeviceDetail/types';

const method = 'GET';
interface ApiData {
  '@type': string;
  expressionObject: {
    expressions: ExpressionItem[];
  };
}

interface RequestData {
  id: string;
  enabled?: boolean;
}

export default function useDeviceRelationListQuery({
  id,
  enabled = true,
}: RequestData) {
  const url = `/tkeel-device/v1/devices/${id}/relation`;
  const { data, ...rest } = useQuery<ApiData>({
    url,
    method,
    reactQueryOptions: {
      enabled,
    },
  });
  const expressionList = data?.expressionObject?.expressions;

  return { expressionList, data, ...rest };
}
