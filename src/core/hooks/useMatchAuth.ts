import { useContext } from "react";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { isMatchAuth } from "../utils";

/** 返回对应权限编号是否存在 */
export function useMatchAuth(authCode?: string | string[]): boolean {
  const { auth, disabled } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const match = isMatchAuth({
    auth,
    authProxy,
    authCode,
    disabled,
  });
  return match;
}
