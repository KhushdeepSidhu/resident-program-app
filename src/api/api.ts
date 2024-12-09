import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosParams: AxiosRequestConfig = {
  baseURL: 'https://welbi.org/api',
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(
      url: string,
      config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> => axios.get<T>(url, config),
    delete: <T>(
      url: string,
      config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> => axios.delete<T>(url, config),
    post: <T>(
      url: string,
      body: any,
      config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> => axios.post<T>(url, body, config),
    patch: <T>(
      url: string,
      body: any,
      config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> => axios.patch<T>(url, body, config),
    put: <T>(
      url: string,
      body: any,
      config: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> => axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
