import { useContext } from "react";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { ValidatorContext } from "../components/Validator";
import { isMatchAuth } from "../utils";

/** 返回对应权限编号是否存在 */
export function useMatchAuth(authCode?: string | string[]): boolean {
  const { auth, disabled } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const { validator } = useContext(ValidatorContext);
  const match = isMatchAuth({
    auth,
    authProxy,
    authCode,
    validator,
    disabled,
  });
  return match;
}
