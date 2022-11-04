import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { wwRequestConfig, WWRequestInterceptors } from './types/type'
import { ResponseResult } from './types/type'

class Axios {
  instance: AxiosInstance
  interceptors?: WWRequestInterceptors

  constructor(config: wwRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //从config中取出的是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  async request<T, D = ResponseResult<T>>(config: wwRequestConfig<D>) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise<D>(async (resolve, reject) => {
      this.instance
        .request<any, D>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(
    config: wwRequestConfig<ResponseResult<T>>
  ): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(
    config: wwRequestConfig<ResponseResult<T>>
  ): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default Axios
