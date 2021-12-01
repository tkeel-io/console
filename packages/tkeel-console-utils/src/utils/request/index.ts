import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function request(config: AxiosRequestConfig) {
  return axios(config);
}

export { AxiosRequestConfig, AxiosResponse };
export default request;
