import { useQuery } from '@tkeel/console-hooks';

import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import type { Result } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface ApiData {
  '@type': string;
  result: Result;
}

interface RequestParams {
  meter: string;
  et?: number;
  st?: number;
  step?: string;
  tenant_id?: string;
}

interface Options {
  params: RequestParams;
  isWithTenantId?: boolean;
}

export default function usePrometheusTKMeterQuery({
  params,
  isWithTenantId = true,
}: Options) {
  const tenantId = useTenantId();
  const newParams =
    isWithTenantId && tenantId ? { tenant_id: tenantId, ...params } : params;
  const res = useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/tkmeter',
    method: 'GET',
    params: newParams,
  });
  const result = res.data?.result;
  const valueItem = result?.result[0]?.value;
  const valueItems = result?.result[0]?.values ?? [];

  return { ...res, valueItem, valueItems };
}
