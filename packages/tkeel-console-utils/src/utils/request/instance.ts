import axios from 'axios';

import { DEFAULT_AXIOS_REQUEST_CONFIG } from './constants';

const instance = axios.create(DEFAULT_AXIOS_REQUEST_CONFIG);

export default instance;
