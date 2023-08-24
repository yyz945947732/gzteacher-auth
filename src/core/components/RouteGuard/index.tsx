import React, { useEffect, useState } from "react";
import {
  matchRoutes,
  useInRouterContext,
  useLocation,
} from "react-router-dom6";

import { useAuthData } from "../../hooks/useAuthData";
import { useDetect } from "../../hooks/useDetect";

export interface RouteGuardProps {
  /** 路由信息，通过 `auth` 字段设定权限 */
  routes?: any[];
  /** 无权限时显示内容，默认为 403 页面 */
  NoAuthFallback?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
}

function RouteGuard(props: RouteGuardProps) {
  useDetect(RouteGuard.name);

  const { routes, NoAuthFallback = <h1>403</h1>, children } = props;

  const isInRouter = useInRouterContext();

  /* istanbul ignore if  */
  if (!isInRouter) {
    console.warn(
      `请在 react-router-dom V6 的 <Router /> 组件中使用 Auth.${RouteGuard.name} 组件。如果你不是使用 V6 版本请不要使用这个组件。@see https://reactrouter.com/en/main/router-components/router。
      `
    );
    return <>{children}</>;
  }

  const location = useLocation();
  const allowRoutes = useAuthData(routes);

  const [isAllow, setIsAllow] = useState(true);

  useEffect(() => {
    if (!allowRoutes || !routes) {
      return;
    }
    if (!matchRoutes(allowRoutes, location) && matchRoutes(routes, location)) {
      setIsAllow(false);
    } else {
      setIsAllow(true);
    }
  }, [location, allowRoutes]);

  return <>{isAllow ? children : NoAuthFallback}</>;
}

export default RouteGuard;
