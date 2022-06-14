// import { keyBy } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';

import useTenantId from '@/tkeel-console-plugin-admin-usage-statistics/hooks/useTenantId';
import type {
  Result,
  // ValueItem,
  ValueItemMap,
  ValueItemsMap,
} from '@/tkeel-console-plugin-admin-usage-statistics/types/query';
import {
  findValueItemInResults,
  findValueItemsInResults,
} from '@/tkeel-console-plugin-admin-usage-statistics/utils/query';

interface ApiData {
  '@type': string;
  results: Result[];
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

  const res = useQuery<ApiData, RequestParams>({
    url: '/tkeel-monitor/v1/prometheus/batch_tkmeter',
    method: 'GET',
    params: newParams,
  });
  const results = res.data?.results ?? [];

  const valueItemMap: ValueItemMap = {};
  const valueItemsMap: ValueItemsMap = {};

  meterList.forEach((meter) => {
    const valueItem = findValueItemInResults({
      data: results,
      query: meter,
    });
    const valueItems = findValueItemsInResults({
      data: results,
      query: meter,
    });

    valueItemMap[meter] = valueItem;
    valueItemsMap[meter] = valueItems;
  });

  /* const args: { [p: number]: ValueItem }[] = meterList.map((meter) => {
    const valueItems = valueItemsMap[meter];
    return keyBy(valueItems, 'timestamp');
  }) as const;
  console.log(args); */

  // const c = merge(...args);

  return { ...res, results, valueItemMap, valueItemsMap };
}
