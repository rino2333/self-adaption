import { type LoadingOptions, ElLoading } from "element-plus"

const defaultOptions = {
  lock: true,
  text: "加载中..."
}

interface ILoadingInstance {
  close: () => void
}

interface IUseFullscreenLoading {
  <T extends (...args: any[]) => ReturnType<T>>(fn: T, options?: LoadingOptions): (
    ...args: Parameters<T>
  ) => Promise<ReturnType<T>> | ReturnType<T>
}

export const useFullscreenLoading: IUseFullscreenLoading = (fn, options = {}) => {
  let loadingInstance: ILoadingInstance
  const showLoading = (options: LoadingOptions) => {
    loadingInstance = ElLoading.service(options)
  }
  const hideLoading = () => {
    loadingInstance && loadingInstance.close()
  }
  const _options = { ...defaultOptions, ...options }
  return (...args) => {
    try {
      showLoading(_options)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      // 同步函数
      if (!isPromise) {
        hideLoading()
        return Promise.resolve(result)
      }
      // Promise
      return result
        .then((res) => {
          return res
        })
        .catch((err) => {
          throw err
        })
        .finally(() => {
          hideLoading()
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
}
