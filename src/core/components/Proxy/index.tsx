import { createContext } from "react";

import { useDetect } from "../../hooks/useDetect";

export interface ProxyProps {
  children?: React.ReactNode;
  /** 权限编号代理，
   * {
   *    代理目标权限代号: 原权限代号
   * }
   * @example
   * {
   *    "auth.target": "auth.origin"
   * }
   *  */
  authProxy?: Record<string, string>;
}

type ProxyContext = Omit<ProxyProps, "children">;
export const ProxyContext = createContext<ProxyContext>({});

function Proxy(props: ProxyProps) {
  useDetect(Proxy.name);

  const { children, ...proxyProps } = props;
  return (
    <ProxyContext.Provider value={proxyProps}>{children}</ProxyContext.Provider>
  );
}

export default Proxy;
