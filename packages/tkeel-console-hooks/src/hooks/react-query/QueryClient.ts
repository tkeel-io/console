import { QueryClient } from 'react-query';

import { DEFAULT_QUERY_CLIENT_CONFIG } from './defaults';
import { QueryClientConfig } from './types';

export default class CustomQueryClient extends QueryClient {
  constructor(config: QueryClientConfig = DEFAULT_QUERY_CLIENT_CONFIG) {
    super(config);
  }
}
