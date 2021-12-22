import { merge } from 'lodash';

import baseRequest from './base-request';
import { DEFAULT_EXTRAS } from './constants';
import { RequestOptions, Response } from './types';

function request<T>(options: RequestOptions): Promise<Response<T>> {
  const requestOptions = merge({ extras: DEFAULT_EXTRAS }, options);
  return baseRequest(requestOptions);
}

export default request;
