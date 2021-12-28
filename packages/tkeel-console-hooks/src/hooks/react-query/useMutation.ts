import { useMutation } from 'react-query';
import { RequestResult } from '@tkeel/console-utils';

import { UseCustomMutationOptions } from './types';
import { getUseMutationOptions, transformResult } from './utils';

export default function useCustomMutation<T, D>(
  options: UseCustomMutationOptions<T, D>
) {
  const opts = getUseMutationOptions<T, D>(options);
  const { mutationKey } = opts;
  const result = useMutation<RequestResult<T>, unknown, unknown>(opts);
  return transformResult<T>({
    keyName: 'mutationKey',
    key: mutationKey,
    result,
  });
}
