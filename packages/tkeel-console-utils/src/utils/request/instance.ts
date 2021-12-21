import axios from 'axios';
import { merge } from 'lodash';

import { DEFAULT_AXIOS_REQUEST_CONFIG } from './constants';

const instance = axios.create(
  merge(
    {
      headers: {
        token: '',
      },
    },
    DEFAULT_AXIOS_REQUEST_CONFIG
  )
);

export default instance;
