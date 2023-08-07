import { omit } from "lodash-es";
import { useContext } from "react";
import { filter, map } from "tree-lodash";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { isMatchAuth } from "../utils";

/** 配置项 */
interface Options {
  /** 是否支持树形结构 */
  isTree?: boolean;
}
const defaultOptions: Options = {
  isTree: true,
};

/** 获取根据权限过滤的集合 */
export function useAuthData(data?: any[], options?: Options) {
  if (!Array.isArray(data)) {
    return data;
  }
  const combineOptions = {
    ...defaultOptions,
    ...options,
  };
  const { auth } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);

  function filterFn(item: any) {
    return !item.auth || isMatchAuth(auth, authProxy, item.auth);
  }

  const authorizedData = combineOptions?.isTree
    ? filter(data, filterFn)
    : data.filter(filterFn);

  function mapFn(item: any) {
    return omit(item, "auth");
  }

  const purifiedData: any[] = combineOptions?.isTree
    ? map(authorizedData, mapFn)
    : authorizedData.map(mapFn);

  return purifiedData;
}
