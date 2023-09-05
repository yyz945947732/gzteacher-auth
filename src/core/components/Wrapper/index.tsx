import React from "react";

import { useDetect } from "../../hooks/useDetect";
import { useMatchAuth } from "../../hooks/useMatchAuth";

export interface WrapperProps {
  /** 权限编号 */
  authCode?: string | string[];
  /** 内容 */
  children?: React.ReactNode;
}

function Wrapper(props: WrapperProps) {
  useDetect(Wrapper.name);

  const { authCode, children } = props;
  const canRender = useMatchAuth(authCode);
  if (!canRender) {
    return <></>;
  }
  return <>{children}</>;
}

export default Wrapper;
