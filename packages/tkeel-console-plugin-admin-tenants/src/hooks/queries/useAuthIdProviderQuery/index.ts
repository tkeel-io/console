import { noop } from 'lodash';

import { useQuery } from '@tkeel/console-hooks';
import { IdProviderType } from '@tkeel/console-types';
import { RequestResult } from '@tkeel/console-utils';

interface AipData {
  '@type': string;
  type: IdProviderType;
  config: string;
}

interface Options {
  tenantId: string;
  onSuccess?: (result: RequestResult<AipData>) => void;
}

export default function useAuthIdProviderTemplateQuery({
  tenantId,
  onSuccess = noop,
}: Options) {
  return useQuery<AipData>({
    url: `/rudder/v1/oauth/id-provider/${tenantId}`,
    method: 'GET',
    reactQueryOptions: { onSuccess },
  });
}
