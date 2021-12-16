import axios, { AxiosRequestConfig } from 'axios';

function request(config: AxiosRequestConfig) {
  return axios(config);
}

export { AxiosRequestConfig, AxiosResponse } from 'axios';
export default request;
