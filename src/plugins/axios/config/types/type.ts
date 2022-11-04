import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface WWRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface wwRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: WWRequestInterceptors<T>
}

export interface ResponseResult<T> {
  success: boolean
  code: number
  message: string
  data: T
}
