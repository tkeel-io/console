import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  RequestResult,
} from './types';

export default function request<T extends Record<string, unknown>>(
  config: AxiosRequestConfigExtended
): Promise<RequestResult<T>> {
  const axiosRequestConfig = merge({}, { extras: DEFAULT_EXTRAS }, config);

  return instance(axiosRequestConfig).then(
    (response: AxiosResponseExtended<T>) => {
      const data: T = get(response, ['data', 'data']);
      return { data, response };
    }
  );
}
