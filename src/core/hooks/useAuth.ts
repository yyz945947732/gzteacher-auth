import { useContext } from "react";

import { ProviderContext } from "../components/Provider";

/** 返回权限信息和权限更新方法 */
export function useAuth(): readonly [any, React.Dispatch<any>] {
  const { auth, setAuth } = useContext(ProviderContext);
  return [auth, setAuth] as const;
}
