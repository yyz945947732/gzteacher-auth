import { useContext } from "react";
import { filter, map } from "tree-lodash";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { ValidatorContext } from "../components/Validator";
import { omit } from "../utils";
import { isMatchAuth } from "../utils";

/** 配置项 */
interface Options {
  /** 是否支持树形结构 */
  isTree?: boolean;
  /** 子节点字段，默认为 `children` */
  childrenKey?: string;
}
const defaultOptions: Options = {
  isTree: true,
  childrenKey: "children",
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
  const { auth, disabled } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const { validator } = useContext(ValidatorContext);

  function filterFn(item: any) {
    return (
      !item.auth ||
      isMatchAuth({
        auth,
        authProxy,
        disabled,
        validator,
        authCode: item.auth,
      })
    );
  }

  const authorizedData = combineOptions?.isTree
    ? filter(data, filterFn, { childrenKey: combineOptions.childrenKey })
    : data.filter(filterFn);

  function mapFn(item: any) {
    return omit(item, ["auth"]);
  }

  const purifiedData: any[] = combineOptions?.isTree
    ? map(authorizedData, mapFn, { childrenKey: combineOptions.childrenKey })
    : authorizedData.map(mapFn);

  return purifiedData;
}
