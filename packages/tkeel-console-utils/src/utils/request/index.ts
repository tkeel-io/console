import axios, { AxiosRequestConfig } from 'axios';

function request(config: AxiosRequestConfig) {
  return axios(config);
}

export { AxiosResponse, AxiosRequestConfig } from 'axios';
export default request;
