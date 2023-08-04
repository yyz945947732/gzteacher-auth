import { useContext } from "react";

import { ProviderContext } from "../components/Provider";
import { ProxyContext } from "../components/Proxy";
import { isMatchAuth } from "../utils";

export function useMatchAuth(authCode?: string | string[]): boolean {
  const { auth } = useContext(ProviderContext);
  const { authProxy } = useContext(ProxyContext);
  const match = isMatchAuth(auth, authProxy, authCode);
  return match;
}
