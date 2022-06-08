import { useQuery } from '@tkeel/console-hooks';

import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import type { QueryItem } from '@/tkeel-console-plugin-admin-usage-statistics/types/query';

interface ApiData {
  '@type': string;
  results: QueryItem[];
}

interface RequestParams {
  meters: string;
  et?: number;
  st?: number;
  step?: string;
  tenant_id?: string;
}

interface Params extends Omit<RequestParams, 'meters'> {
  meters: string[];
}

interface Options {
  params: Params;
  isWithTenantId?: boolean;
}

export default function usePrometheusTKMeterBatchQuery({
  params,
  isWithTenantId = true,
}: Options) {
  const { meters: meterList, ...rest } = params;
  const meters = meterList.join('|');
  const p = { meters, ...rest };

  const tenantId = useTenantId();
  const newParams =
    isWithTenantId && tenantId ? { tenant_id: tenantId, ...p } : p;

  const result = useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/batch_tkmeter',
    method: 'GET',
    params: newParams,
  });
  const items = result.data?.results ?? [];

  return { ...result, items };
}
