import { defaults, omit } from "lodash-es";
import { useContext } from "react";
import { filter, map } from "tree-lodash";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { ValidatorContext } from "../components/Validator";
import { isMatchAuth } from "../utils";

/** 配置项 */
interface Options {
  /** 是否支持树形结构 */
  isTree?: boolean;
  /** 子节点字段，默认为 `children` */
  childrenKey?: string;
  /** 权限验证字段，默认为 `auth` */
  authKey?: string;
  /** 返回数据是否保留权限验证字段，默认为 `true` */
  isPreserveAuthKey?: boolean;
}
const defaultOptions: Required<Options> = {
  isTree: true,
  childrenKey: "children",
  authKey: "auth",
  isPreserveAuthKey: true,
};

/** 获取根据权限过滤的集合 */
export function useAuthData(data?: any[], options?: Options) {
  const combineOptions = defaults(options, defaultOptions);
  const { auth, disabled } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const { validator } = useContext(ValidatorContext);

  /* istanbul ignore if  */
  if (!Array.isArray(data)) {
    return data;
  }

  const { authKey, isTree, isPreserveAuthKey, childrenKey } = combineOptions;

  function filterFn(item: any) {
    return (
      !item[authKey] ||
      isMatchAuth({
        auth,
        authProxy,
        disabled,
        validator,
        authCode: item[authKey],
      })
    );
  }

  function mapFn(item: any) {
    return omit(item, authKey);
  }

  const authorizedData = isTree
    ? filter(data, filterFn, { childrenKey })
    : data.filter(filterFn);

  if (isPreserveAuthKey) {
    return authorizedData;
  }

  const purifiedData: any[] = isTree
    ? map(authorizedData, mapFn, { childrenKey })
    : authorizedData.map(mapFn);

  return purifiedData;
}
