import { get } from 'lodash';

import instance from './instance';
import {
  AxiosRequestConfigExtended,
  AxiosResponseExtended,
  Response,
} from './types';

function baseRequest<T>(
  config: AxiosRequestConfigExtended
): Promise<Response<T>> {
  return instance(config).then((response: AxiosResponseExtended<T>) => {
    const data: T = get(response, ['data', 'data']);
    return { data, response };
  });
}

export default baseRequest;
