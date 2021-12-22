import { get, merge } from 'lodash';

import { DEFAULT_EXTRAS } from './defaults';
import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  Response,
} from './types';

export default function Request<T>(
  config: AxiosRequestConfigExtended
): Promise<Response<T>> {
  const axiosRequestConfig = merge({}, { extras: DEFAULT_EXTRAS }, config);

  return instance(axiosRequestConfig).then(
    (response: AxiosResponseExtended<T>) => {
      const data: T = get(response, ['data', 'data']);
      return { data, response };
    }
  );
}
