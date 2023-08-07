import { omit } from "lodash-es";
import { useContext } from "react";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { isMatchAuth } from "../utils";

/** 获取根据权限过滤的集合 */
export function useAuthData(data?: any[]) {
  if (!Array.isArray(data)) {
    return data;
  }
  const { auth } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const authorizedData = data?.filter(
    (item) => !item.auth || isMatchAuth(auth, authProxy, item.auth)
  );
  const purifiedData = authorizedData?.map((item) => omit(item, "auth"));
  return purifiedData;
}
